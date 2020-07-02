import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditingState, RowDetailState, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableRowDetail,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import DragIndicator from '@material-ui/icons/DragIndicator';
import PostAdd from '@material-ui/icons/PostAdd';
import Delete from '@material-ui/icons/Delete';

const getRowId = row => row.id;

const BooleanFormatter = ({ value }) => value ? <Done /> : <Close />;

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    {...props}
  />
);

const DragHandle = SortableHandle(({ style }) => (
  <Tooltip title="Drag to reorder" enterDelay={400}>
    <span style={{ ...style, cursor: "move" }}><DragIndicator /></span>
  </Tooltip>
));

const FocusableCell = ({ onClick, ...restProps }) => {
  if (restProps.column.name === "drag") {
    return (
      <Table.Cell {...restProps}>
        <DragHandle />
      </Table.Cell>
    );
  }
  return <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} style={{ ...restProps.style, cursor: 'pointer' }} />;
}

const RowDetail = ({ row }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const addTest = React.useCallback(() => {
    setText('');
    dispatch({ type: 'addTest', storyId: row.id, text });
  }, [row, text, dispatch]);
  const deleteTest = React.useCallback((testId) => dispatch({ type: 'deleteTest', testId, storyId: row.id }), [row, dispatch]);

  return (
    <div>
      <div style={{ paddingBottom: '8px' }}>
        {row.tests.length ? row.tests.map(test => (
          <Chip
            key={test.id}
            label={test.text}
            onDelete={() => deleteTest(test.id)}
            style={{ marginRight: '8px' }}
          />
        )) : (
          <p>
            No tests here.
          </p>
        )}
      </div>

      <div>
        <TextField variant="filled" value={text} onChange={e => setText(e.target.value)} />
        <Button color="primary" onClick={addTest}>
          Add
        </Button>
      </div>
    </div>
  );
};

const AddButton = ({ onExecute }) => (
  <Tooltip title="Create a story" enterDelay={500}>
    <IconButton
      style={{ textAlign: 'center' }}
      onClick={onExecute}
    >
      <PostAdd
        style={{ color: '#E91E63' }}
      />
    </IconButton>
  </Tooltip>
);

const DeleteButton = ({ onExecute }) => (
  <Tooltip title="Delete the story" enterDelay={500}>
    <IconButton
      onClick={() => {
        // eslint-disable-next-line
        if (window.confirm('Are you sure you want to delete this story?')) {
          onExecute();
        }
      }}
    >
      <Delete />
    </IconButton>
  </Tooltip>
);

const commandComponents = {
  add: AddButton,
  delete: DeleteButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const columns = [
  { name: 'role', title: 'Role' },
  { name: 'action', title: 'Action' },
  { name: 'purpose', title: 'Purpose' },
  { name: 'tests', title: 'Tests', getCellValue: row => row.tests.length > 0 ? true : false },
  { name: 'drag', title: ' ' },
];

const editingStateColumnExtensions = [
  { columnName: 'tests', editingEnabled: false },
];

const tableColumnExtensions = [
  { columnName: 'role', width: 150, wordWrapEnabled: true },
  { columnName: 'action', wordWrapEnabled: true },
  { columnName: 'purpose', wordWrapEnabled: true },
  { columnName: 'tests', width: 55, align: 'center' },
  { columnName: 'drag', width: 40, align: 'center' },
];

export default () => {
  const stories = useSelector(state => state.stories);
  const dispatch = useDispatch();
  const [editingCells, setEditingCells] = useState([]);
  const addEmptyStory = React.useCallback(() => dispatch({ type: 'addStory' }), [dispatch]);
  const onSortEnd = React.useCallback(({ oldIndex, newIndex }) =>
    dispatch({ type: 'setStories', stories: arrayMove(stories, oldIndex, newIndex) }), [dispatch, stories]);
  const Body = React.useCallback((props) => {
    const TableBody = SortableContainer(Table.TableBody);
    return (
      <TableBody {...props} onSortEnd={onSortEnd} useDragHandle />
    );
  }, [onSortEnd]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (changed) {
      dispatch({ type: 'changeStory', changed });
    }
    if (deleted) {
      dispatch({ type: 'deleteStory', deleted });
    }
  };

  return (
    <Grid
      rows={stories}
      columns={columns}
      getRowId={getRowId}
    >
      <BooleanTypeProvider for={['tests']} />

      <RowDetailState />
      <EditingState
        onCommitChanges={commitChanges}
        editingCells={editingCells}
        onEditingCellsChange={setEditingCells}
        addedRows={[]}
        onAddedRowsChange={addEmptyStory}
        columnExtensions={editingStateColumnExtensions}
      />
      <Table
        columnExtensions={tableColumnExtensions}
        cellComponent={FocusableCell}
        bodyComponent={Body}
        rowComponent={({ row, ...restProps }) => {
          const TableRow = SortableElement(Table.Row);
          return <TableRow {...restProps} row={row} index={stories.indexOf(row)} />;
        }}  
      />
      <TableHeaderRow />
      <TableInlineCellEditing selectTextOnEditStart />
      <TableEditColumn
        width={70}
        showAddCommand
        showDeleteCommand
        commandComponent={Command}
      />
      <TableRowDetail
        contentComponent={RowDetail}
      />
    </Grid>
  );
};
