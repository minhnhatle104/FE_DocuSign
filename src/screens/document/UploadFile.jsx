import Box from '@mui/material/Box'
import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'
import UploadSignature from '../signature/UploadSignature/index.jsx'
import { useCallback, useRef } from 'react'
import {
  closeLoading,
  displayLoading,
} from '../../../redux/slice/loadingSlice.js'
import { v4 as uuidv4 } from 'uuid'
import axiosConfig from '../../utils/axiosConfig.js'
import { useDispatch } from 'react-redux'
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
function UploadFile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileDocumentRef = useRef(null)
  const [isSignKey, setSignKey] = useState(true)

  useEffect(() => {
    console.log(isSignKey);
  }, [isSignKey])

  const navigateToHomepage = () => {
    navigate('/')
  }

  const handleAddDocument = useCallback(async () => {
    dispatch(displayLoading())
    const userId = localStorage.getItem('uid')
    const id = uuidv4()
    const fileName = `${userId}_document_${id}.pdf`

    let documentFile = new File(
      [fileDocumentRef.current.getFiles()[0].file],
      fileName,
      {
        type: 'application/pdf',
      }
    )

    const payload = Object.assign({}, documentFile && { file: documentFile })

    const formData = new FormData()
    formData.append('file', payload.file)

    axiosConfig
      .post(
        'http://localhost:80/api/document/upload',
        formData
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          const file_name = response.data.result.document.file_name
          const file_url = response.data.result.document.file_url
          navigate('/document/recipientInfo', {
            state: { file_name, file_url, isSignKey },
          })
        },
        (error) => {
          dispatch(closeLoading())
        }
      )
  }, [dispatch, navigate, isSignKey])

  const handleChangeCheckBox = (event) => {
    const status = event.target.checked
    setSignKey(status)
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} fontFamily="Quicksand">
        <Layout>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            marginTop={10}
            fontFamily="Roboto"
          >
            <Box>
              <Button variant="contained" onClick={navigateToHomepage}>
                Back
              </Button>
            </Box>
            <Box>
              <Button variant="contained" onClick={handleAddDocument}>
                Next
              </Button>
            </Box>
          </Box>
          <StepInit step={0} />
        </Layout>
        <UploadSignature ref={fileDocumentRef} />
        <div className="d-flex float-right">
          <Box>
            <FormControlLabel
                style={{
                  marginTop: 5,
                }}
                control={
                  <Checkbox
                      checked={isSignKey}
                      onChange={handleChangeCheckBox}
                  />
                }
                label={
                  <Typography
                      style={{
                        fontSize: 14,
                        color: '#646464',
                      }}
                  >
                    Sign With Pair Of Keys
                  </Typography>
                }
            />
          </Box>
        </div>
      </Box>
    </>
  )
}
export default UploadFile
