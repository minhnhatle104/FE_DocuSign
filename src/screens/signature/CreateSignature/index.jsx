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

const CreateSignature = ({ open, handleClose }) => {
  const [value, setValue] = useState(0)
  const mainCanvasRef = useRef(null)
  const shortCanvasRef = useRef(null)

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const handleAddSignature = useCallback(async () => {
    if (value === 0) {
      const mainSignatureData =
        mainCanvasRef.current.canvasContainer.childNodes[1].toDataURL()
      const shortSignatureData =
        shortCanvasRef.current.canvasContainer.childNodes[1].toDataURL()

      // Save images to local
      //   const mainFileName = 'user_1_main.jpg'
      //   const shortFileName = 'user_1_short.jpg'
      //   saveAs(mainSignatureData, mainFileName)
      //   saveAs(shortSignatureData, shortFileName)

      const payload = Object.assign(
        {},
        { userId: '123' },
        mainSignatureData && { mainFile: mainSignatureData },
        shortSignatureData && { shortFile: shortSignatureData }
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
    }
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
          mainCanvasRef={mainCanvasRef}
          shortCanvasRef={shortCanvasRef}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Upload
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
