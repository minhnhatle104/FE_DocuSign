import Box from '@mui/material/Box'
import React from 'react'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'
import UploadSignature from "../signature/UploadSignature/index.jsx";

function UploadFile() {
  const navigate = useNavigate()

  const navigateToHomepage = () => {
    navigate('/')
  }

  const navigateToNextStep = () => {
    navigate('/document/recipientInfo')
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
              <Button variant="contained" onClick={navigateToNextStep}>
                Next
              </Button>
            </Box>
          </Box>
          <StepInit step={0} />
        </Layout>
        <UploadSignature />

      </Box>
    </>
  )
}
export default UploadFile
