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
  const mainSignatureRef = useRef(null)
  const shortSignatureRef = useRef(null)

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const handleAddSignature = useCallback(async () => {
    let mainSignatureFile, shortSignatureFile
    if (value === 0) {
      mainSignatureFile =
        mainSignatureRef.current.canvasContainer.childNodes[1].toDataURL()
      shortSignatureFile =
        shortSignatureRef.current.canvasContainer.childNodes[1].toDataURL()

      // Save images to local
      //   const mainFileName = 'user_1_main.jpg'
      //   const shortFileName = 'user_1_short.jpg'
      //   saveAs(mainSignatureData, mainFileName)
      //   saveAs(shortSignatureData, shortFileName)
    } else {
      mainSignatureFile = mainSignatureRef.current.getFiles()[0].file
      shortSignatureFile = shortSignatureRef.current.getFiles()[0].file
    }
    const payload = Object.assign(
      {},
      { userId: '123' },
      mainSignatureFile && { mainFile: mainSignatureFile },
      shortSignatureFile && { shortFile: shortSignatureFile }
    )

    const formData = new FormData()
    formData.append('userId', payload.userId)
    formData.append('mainFile', payload.mainFile)
    formData.append('shortFile', payload.shortFile)

    // TODO: Integrate with BE
    await axios.post('http://localhost:4040/api/signature', formData).then(
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
        <DrawSignature
          ref={{
            mainCanvasRef: mainSignatureRef,
            shortCanvasRef: shortSignatureRef,
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UploadSignature
          ref={{
            mainFileRef: mainSignatureRef,
            shortFileRef: shortSignatureRef,
          }}
        />
      </TabPanel>
      <DialogActions>
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
