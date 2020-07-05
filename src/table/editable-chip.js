import * as React from 'react';
import { useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const onFocus = e => e.target.select();
const inputProps = { onFocus };

export const EditableChip = ({ label, onDelete, testId, storyId, ...restProps }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(label);
  const handleChange = React.useCallback((event) => setValue(event.target.value), [setValue]);
  const [editable, setEditable] = React.useState(false);
  const commitChanges = React.useCallback(() => dispatch({ type: 'setTest', storyId, testId, value }), [dispatch, value, storyId, testId]);
  const onBlur = React.useCallback(() => {
    setEditable(false);
    commitChanges({ testId, storyId, value });
  }, [commitChanges, testId, storyId, value]);
  const onKeyDown = React.useCallback((e) => {
    if (e.keyCode === 13) onBlur();
  }, [onBlur]);
  const onClick = React.useCallback(() => setEditable(true), []);

  return editable ? (
    <TextField value={value} onChange={handleChange} autoFocus onBlur={onBlur} inputProps={inputProps} onKeyDown1={onKeyDown} />
  ) : (
    <Chip {...restProps} label={label} onDelete={onDelete} onClick={onClick} />
  );
};