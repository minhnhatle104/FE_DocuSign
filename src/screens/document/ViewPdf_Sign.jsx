import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'

function SignPdf() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const navigateToPrevStep = () => {
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
              <Button variant="contained" onClick={navigateToPrevStep}>
                Back
              </Button>
            </Box>
          </Box>
          <StepInit step={2} />
          <PdfViewer
            isShowChooseImage={true}
            recipientList={state.recipientList}
            fileNamePdf={state.selectPdf}
            urlPdf={state.pdfURl}
          />
        </Layout>
      </Box>
    </>
  )
}

export default SignPdf
