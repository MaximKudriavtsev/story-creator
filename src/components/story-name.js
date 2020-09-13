import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const onFocus = e => e.target.select();
const inputProps = { onFocus };

export default () => {
  const storyName = useSelector(state => state.storyName);
  const dispatch = useDispatch();
  const handleChange = React.useCallback((event) => dispatch({ type: 'setStoryName', storyName: event.target.value }), [dispatch]);
  const [editable, setEditable] = React.useState(false);
  const onBlur = React.useCallback(() => setEditable(false), []);
  const onKeyDown = React.useCallback((e) => {
    if (e.keyCode === 13) onBlur();
  }, [onBlur]);
  const onClick = React.useCallback(() => setEditable(true), []);

  return editable ? (
    <TextField value={storyName} onChange={handleChange} autoFocus onBlur={onBlur} inputProps={inputProps} onKeyDown={onKeyDown} />
  ) : (
    <Tooltip title="Click to change the stories name">
      <Typography onClick={onClick} color="primary" style={{ margin: '10px' }} >
        {storyName}
      </Typography>
    </Tooltip>
  );
};