import React, { useState } from 'react';
import { EditingState, RowDetailState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableRowDetail,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';

const getRowId = row => row.id;

const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const RowDetail = ({ row }) => (
  <div>
    'Acceptance Criteria & Tests'
  </div>
);

export default ({ data, setData }) => {
  const [columns] = useState([
    { name: 'id', title: '#id' },
    { name: 'role', title: 'Role' },
    { name: 'action', title: 'Action' },
    { name: 'result', title: 'Result' },
  ]);
  const [editingCells, setEditingCells] = useState([]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = data.length > 0
        ? Math.max(data[data.length - 1].id, data[0].id) + 1
        : 0;
      changedRows = [
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
        ...data,
      ];
      setEditingCells([{ rowId: startingAddedId, columnName: columns[0].name }]);
    }
    if (changed) {
      changedRows = data.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = data.filter(row => !deletedSet.has(row.id));
    }

    setData(changedRows);
  };

  const addEmptyRow = () => commitChanges({ added: [{}] });

  return (
    <div className="card">
      <Grid
        rows={data}
        columns={columns}
        getRowId={getRowId}
      >
        <RowDetailState />
        <EditingState
          onCommitChanges={commitChanges}
          editingCells={editingCells}
          onEditingCellsChange={setEditingCells}
          addedRows={[]}
          onAddedRowsChange={addEmptyRow}
        />
        <Table cellComponent={FocusableCell} />
        <TableHeaderRow />
        <TableInlineCellEditing selectTextOnEditStart />
        <TableEditColumn
          showAddCommand
          showDeleteCommand
        />
        <TableRowDetail
          contentComponent={RowDetail}
        />
      </Grid>
    </div>
  );
};
