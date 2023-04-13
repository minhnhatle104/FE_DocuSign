import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import React from 'react'

const DeleteSignature = ({ open, onClose, onClickCancel, onClickConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-signature-title"
      aria-describedby="delete-signature-description"
    >
      <DialogTitle id="delete-signature-title">
        <WarningIcon sx={{ color: 'darkorange', marginRight: '0.5rem' }} />{' '}
        Delete signature
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="delete-signature-description"
          color="text.primary"
        >
          Are you sure you want to delete this signature?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCancel}>Cancel</Button>
        <Button id="btnDeleteSignature" color="error" variant="contained" onClick={onClickConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteSignature
