import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import axios from 'axios'
// import { saveAs } from 'file-saver'
import TabPanel from '../../../components/TabPanel'
import DrawSignature from '../DrawSignature'
import { StyledDialog } from './styles'
import UploadSignature from '../UploadSignature'

const CreateSignature = ({ open, handleClose }) => {
  const [value, setValue] = useState(0)
  const signatureRef = useRef(null)

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const handleAddSignature = useCallback(() => {
    let signatureFile
    if (value === 0) {
      signatureFile =
        signatureRef.current.canvasContainer.childNodes[1].toDataURL()

      // Save images to local
      //   const mainFileName = 'user_1_main.jpg'
      //   const shortFileName = 'user_1_short.jpg'
      //   saveAs(mainSignatureData, mainFileName)
      //   saveAs(shortSignatureData, shortFileName)
    } else {
      signatureFile = signatureRef.current.getFiles()[0].file
    }
    const payload = Object.assign(
      {},
      { userId: '123' },
      signatureFile && { mainFile: signatureFile }
    )

    const formData = new FormData()
    formData.append('userId', payload.userId)
    formData.append('mainFile', payload.mainFile)

    // TODO: Integrate with BE
    axios.post('http://localhost:4040/api/signature', formData).then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [value])

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Create signature</DialogTitle>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Draw" />
          <Tab label="Upload" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DrawSignature ref={signatureRef} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UploadSignature ref={signatureRef} />
      </TabPanel>
      <DialogActions sx={{ paddingRight: '2.5rem' }}>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSignature}
        >
          Add
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default CreateSignature
