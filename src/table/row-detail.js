import * as React from 'react';
import { useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { EditableChip } from './editable-chip';

export const RowDetail = ({ row }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const addTest = React.useCallback(() => {
    setText('');
    dispatch({ type: 'addTest', storyId: row.id, text });
  }, [row, text, dispatch]);
  const deleteTest = React.useCallback((testId) => dispatch({ type: 'deleteTest', testId, storyId: row.id }), [row, dispatch]);
  const onKeyDown = React.useCallback((e) => {
    if (e.keyCode === 13 && !!text.trim()) addTest();
  }, [addTest, text]);

  return (
    <div>
      <div style={{ paddingBottom: '8px' }}>
        {row.tests.length ? row.tests.map(test => (
          <EditableChip
            testId={test.id}
            storyId={row.id}
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
        <TextField variant="filled" value={text} onChange={e => setText(e.target.value)} onKeyDown={onKeyDown} autoFocus />
        <Button color="primary" onClick={addTest}>
          Add
        </Button>
      </div>
    </div>
  );
};