import {React} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from '@mui/material';


function DeleteConfirmationDialog(props) {
  function handleClose() {
    props.onClose()
  }
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >Cancel</Button>
        <Button
          onClick={props.onConfirm}
        >Delete</Button>
      </DialogActions>
    </Dialog>
  )
};

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onReject: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default DeleteConfirmationDialog;