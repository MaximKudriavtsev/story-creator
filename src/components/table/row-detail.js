import * as React from 'react';
import { useDispatch } from 'react-redux';
import { EditableChip } from './editable-chip';

export const RowDetail = ({ row }) => {
  const dispatch = useDispatch();
  const addTest = React.useCallback(({ value }) => {
    dispatch({ type: 'addTest', storyId: row.id, text: value });
  }, [row, dispatch]);
  const deleteTest = React.useCallback((testId) => dispatch({ type: 'deleteTest', testId, storyId: row.id }), [row, dispatch]);
  const commitChanges = React.useCallback(({ storyId, testId, value }) => dispatch({ type: 'setTest', storyId, testId, value }), [dispatch]);

  return (
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
      )) : null}
        <EditableChip
          testId={'test.id'}
          storyId={'row.id'}
          label="+"
          commitChanges={addTest}
        />
    </div>
  );
};