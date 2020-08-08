import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditingState, RowDetailState, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableEditColumn,
  TableRowDetail,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';
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
import { RowDetail } from './table/row-detail';
import { ImageLoader } from './table/image-loader';

const getRowId = row => row.id;
const emptyArray = [];
const booleans = ['tests'];

const Root = props => <Grid.Root {...props} style={{ height: '100%' }} />;

const BooleanFormatter = ({ value }) => (
  <Tooltip title="Click to chevron icon to edit tests">
    {value ? <Done /> : <Close />}
  </Tooltip>
);

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

const FocusableCell = React.memo(({ onClick, ...restProps }) => {
  const width = restProps.column.name === 'drag' ? 50 : 195;
  const style = React.useMemo(() => ({ width }), [width]);
  if (restProps.column.name === "drag") {
    return (
      <VirtualTable.Cell {...restProps} style={style}>
        <DragHandle />
      </VirtualTable.Cell>
    );
  }
  if (restProps.column.name === 'image') {
    return (
      <VirtualTable.Cell {...restProps} style={style}>
        <ImageLoader storyId={restProps.row.id} imgUrl={restProps.row.imgUrl} loading={restProps.row.loading} />
      </VirtualTable.Cell>
    );
  }
  return <VirtualTable.Cell {...restProps} tabIndex={0} onFocus={onClick} style={{ ...restProps.style, cursor: 'pointer', width }} />;
});

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
  { name: 'image', title: 'Image' },
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
  { columnName: 'image', width: 70, align: 'center' },
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
    const TableBody = SortableContainer(VirtualTable.TableBody);
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
      rootComponent={Root}
    >
      <BooleanTypeProvider for={booleans} />

      <RowDetailState />
      <EditingState
        onCommitChanges={commitChanges}
        editingCells={editingCells}
        onEditingCellsChange={setEditingCells}
        addedRows={emptyArray}
        onAddedRowsChange={addEmptyStory}
        columnExtensions={editingStateColumnExtensions}
      />
      <VirtualTable
        height="auto"
        columnExtensions={tableColumnExtensions}
        cellComponent={FocusableCell}
        bodyComponent={Body}
        rowComponent={({ row, ...restProps }) => {
          const TableRow = SortableElement(VirtualTable.Row);
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
