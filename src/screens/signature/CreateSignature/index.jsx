import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TabPanel from '../../../components/TabPanel'
import axiosConfig from '../../../utils/axiosConfig'
import DrawSignature from '../DrawSignature'
import { StyledDialog } from './styles'
import UploadSignature from '../UploadSignature'
import { useDispatch } from 'react-redux'
import {
  closeLoading,
  displayLoading,
} from '../../../../redux/slice/loadingSlice'

const CreateSignature = ({ open, handleClose, handleFetchSignatureList }) => {
  const [value, setValue] = useState(0)
  const canvasSignatureRef = useRef(null)
  const fileSignatureRef = useRef(null)

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const dispatch = useDispatch()

  const handleAddSignature = useCallback(async () => {
    handleClose()
    dispatch(displayLoading())
    const userId = localStorage.getItem('uid')
    const id = uuidv4()
    const fileName = `${userId}_signature_${id}.png`

    let signatureFile
    if (value === 0) {
      const res = await fetch(
        canvasSignatureRef.current.canvasContainer.childNodes[1].toDataURL()
      )
      const buff = await res.arrayBuffer()

      signatureFile = new File([buff], fileName, {
        type: 'image/png',
      })
    } else {
      signatureFile = new File(
        [fileSignatureRef.current.getFiles()[0].file],
        fileName,
        {
          type: 'image/png',
        }
      )
    }

    const payload = Object.assign({}, signatureFile && { file: signatureFile })

    const formData = new FormData()
    formData.append('file', payload.file)

    axiosConfig
      .post('https://group07-be-signature.onrender.com/api/signature/upload', formData, {
        headers: 'multipart/form-data',
      })
      .then(
        (response) => {
          dispatch(closeLoading())
          handleFetchSignatureList()
          console.log(response)
        },
        (error) => {
          dispatch(closeLoading())
          console.log(error)
        }
      )
  }, [dispatch, handleClose, handleFetchSignatureList, value])

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
        <DrawSignature ref={canvasSignatureRef} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UploadSignature ref={fileSignatureRef} />
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
