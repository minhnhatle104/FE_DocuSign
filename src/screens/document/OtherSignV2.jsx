import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React, {useState} from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'
import {useEffect} from "react";
import axiosConfig from "../../utils/axiosConfig.js";

function OtherSignPdf() {
  const [signedURL, setSignedURL] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()
  const navigateToPrevStep = () => {
    navigate('/document/recipientInfo')
  }
  // const userId = localStorage.getItem('uid')
  const filename = searchParams.get("filename")
  const owner = searchParams.get("owner")
  const isSignKey = searchParams.get("isSignKey") == 'true'?true:false
  const revID =  localStorage.getItem('uid')

  useEffect(()=>{
    axiosConfig.post('http://localhost:80/api/document/getSignedURL', {
      filename: filename,
      uid: owner,
      revID
    }).then((response)=>{
      console.log(response.data)
      if(response.status == 200){
        if  (response.data.isSign == false){
          navigate('/')
        }else{
          setSignedURL(response.data.signedURL)
        }
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
            <PdfViewer
                isShowChooseImage={true}
                recipientList={null}
                fileNamePdf={filename}
                urlPdf={signedURL}
                uid={owner}
                isSignKey={isSignKey}
            />
          </Layout>
        </Box>
      </>
  )
}

export default OtherSignPdf
