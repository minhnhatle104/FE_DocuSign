import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React from 'react'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'

function RecipientInfo() {
  const navigate = useNavigate()

  const navigateToPrevStep = () => {
    navigate('/document/upload')
  }

  const navigateToNextStep = () => {
    navigate('/document/signPDF')
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
              <Button variant="contained" onClick={navigateToPrevStep}>
                Back
              </Button>
            </Box>
            <Box>
              <Button variant="contained" onClick={navigateToNextStep}>
                Next
              </Button>
            </Box>
          </Box>
          <StepInit step={1} />
        </Layout>
      </Box>
    </>
  )
}
export default RecipientInfo
