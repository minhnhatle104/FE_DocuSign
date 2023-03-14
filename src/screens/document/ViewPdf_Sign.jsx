import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React, {useState} from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'

function SignPdf() {
  const navigate = useNavigate()
  const [isSign, setSign] = useState(false)

  const navigateToPrevStep = () => {
    navigate('/document/recipientInfo')
  }

  const navigateToNextStep = () => {
    setSign(true)
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
          <StepInit step={2} />
          <PdfViewer isSign={isSign} isShowChooseImage={true} />
        </Layout>
      </Box>
    </>
  )
}

export default SignPdf
