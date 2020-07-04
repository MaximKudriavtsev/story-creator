import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { convertFromMD } from './utils/convert-from-md';

export default function UploadMenu() {
  const isOpen = useSelector(state => state.isDialogOpen);
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const handleClose = React.useCallback(() => {
    dispatch({ type: 'setDialog', value: false });
    setText('');
  }, [dispatch, setText]);
  const handleUpload = React.useCallback(() => {
    dispatch({ type: 'setState', ...convertFromMD(text) });
    handleClose();
    setText('');
  }, [dispatch, text, handleClose, setText]);
  const textChange = React.useCallback(e => setText(e.target.value), [setText]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Stories Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can upload your user stories into the App as a plain text.
          </DialogContentText>
          <TextField value={text} onChange={textChange} variant="outlined" multiline style={{ width: '100%' }} placeholder="Pass MD text here..." />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
