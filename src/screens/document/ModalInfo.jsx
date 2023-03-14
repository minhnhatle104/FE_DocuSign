import React from 'react'
import { Box, Modal, Typography } from '@mui/material'
import Button from '@mui/material/Button'

const ModalInfo = ({ open, closeHandler, okHandler, header, description }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography style={{ fontWeight: 'bold' }} variant="h6" component="h2">
          {header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} marginTop={1}>
          <Button
            style={{ marginRight: 5 }}
            variant="outlined"
            color="error"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={okHandler}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalInfo
