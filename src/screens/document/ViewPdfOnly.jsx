import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React, {useEffect, useState} from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import {useLocation, useNavigate} from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'
import axios from "axios";
import axiosConfig from "../../utils/axiosConfig.js";

function ViewPDF() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const  [signedURL, setSignedURL] =  useState()
  console.log(state)

  const navigateToPrevStep = () => {
    navigate('/document/list')
  }

  useEffect(()=>{
    axiosConfig.post('http://localhost:80/api/document/getSignedURL', {
      filename: state.filename,
      uid: state.uid
    }).then((response)=>{
      console.log(response.data)
      if(response.status == 200){
        setSignedURL(response.data.signedURL)
      }
    })
  }, [])
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
            <PdfViewer
                isShowChooseImage={false}
                recipientList = {[]}
                fileNamePdf={state.filename}
                urlPdf={signedURL}
                uid={state.uid}
            />
          </div>
        </Layout>
      </Box>
    </>
  )
}

export default ViewPDF
