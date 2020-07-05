import * as React from 'react';
import { useDispatch } from 'react-redux';
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { EditableChip } from './editable-chip';

export const RowDetail = ({ row }) => {
  const dispatch = useDispatch();
  const addTest = React.useCallback(({ value }) => {
    dispatch({ type: 'addTest', storyId: row.id, text: value });
  }, [row, dispatch]);
  const deleteTest = React.useCallback((testId) => dispatch({ type: 'deleteTest', testId, storyId: row.id }), [row, dispatch]);
  const commitChanges = React.useCallback(({ storyId, testId, value }) => dispatch({ type: 'setTest', storyId, testId, value }), [dispatch]);

  return (
    <div>
      <div style={{ paddingBottom: '8px' }}>
        {row.tests.length ? row.tests.map(test => (
          <EditableChip
            key={test.id}
            testId={test.id}
            storyId={row.id}
            label={test.text}
            onDelete={() => deleteTest(test.id)}
            commitChanges={commitChanges}
          />
        )) : (
          <p>
            No tests here.
          </p>
        )}
        <EditableChip
          testId={'test.id'}
          storyId={'row.id'}
          label="+"
          commitChanges={addTest}
        />
      </div>

      <div>
        {/* <EditableChip
          testId={'test.id'}
          storyId={'row.id'}
          label="Empty test item"
          commitChanges={addTest}
        /> */}
        {/* <TextField variant="filled" value={value} onChange={e => setText(e.target.value)} onKeyDown={onKeyDown} autoFocus />
        <Button color="primary" onClick={addTest}>
          Add
        </Button> */}
      </div>
    </div>
  );
};