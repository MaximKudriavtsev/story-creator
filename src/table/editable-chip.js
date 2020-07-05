import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

const onFocus = e => e.target.select();
const inputProps = { onFocus };

export const EditableChip = ({ label, onDelete, testId, storyId, commitChanges }) => {
  const [value, setValue] = React.useState(label);
  const handleChange = React.useCallback((event) => setValue(event.target.value), [setValue]);
  const [editable, setEditable] = React.useState(false);
  const onBlur = React.useCallback(() => {
    setEditable(false);
    commitChanges({ testId, storyId, value });
  }, [commitChanges, testId, storyId, value]);
  const onKeyDown = React.useCallback((e) => {
    if (e.keyCode === 13) onBlur();
  }, [onBlur]);
  const onClick = React.useCallback(() => setEditable(true), []);
  const chipRef = React.useRef();
  React.useEffect(() => {
    chipRef.current.focus();
  }, []);

  return editable ? (
    <TextField value={value} onChange={handleChange} autoFocus onBlur={onBlur} inputProps={inputProps} onKeyDown={onKeyDown} /> 
  ) : (
    <Chip
      ref={chipRef}
      label={label}
      onDelete={onDelete}
      variant={onDelete ? 'default' : 'outlined'}
      onClick={onClick}
      style={{ marginRight: '8px' }}
      color={onDelete ? 'default' : 'secondary'}
    />
  );
};