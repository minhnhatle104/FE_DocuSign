import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React, { useState } from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'

function ViewPDF() {
  const navigate = useNavigate()

  const navigateToPrevStep = () => {
    navigate('/document/list')
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
          <div className="row d-flex justify-content-center">
            <PdfViewer isShowChooseImage={false} />
          </div>
        </Layout>
      </Box>
    </>
  )
}

export default ViewPDF
