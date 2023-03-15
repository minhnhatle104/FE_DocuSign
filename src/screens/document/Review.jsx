import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/index.jsx'
import EmailIcon from '@mui/icons-material/Email'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import InfoIcon from '@mui/icons-material/Info'
import { AutoGraph } from '@mui/icons-material'
import axios from 'axios'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import {
  closeLoading,
  displayLoading,
} from '../../../redux/slice/loadingSlice.js'
import { useDispatch } from 'react-redux'

function Review() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToPrevStep = () => {
    navigate('/document/signPDF')
  }

  function sendForward() {
    dispatch(displayLoading())
    const userID = localStorage.getItem('uid')
    const email = 'khuong16lop9a6@gmail.com'
    const name = 'Nguyen Ba Khuong'
    const documentId = '07.pdf'

    const data = {
      userID,
      email,
      name,
      documentId,
    }
    axios.post('https://group07-be-noti.onrender.com/api/notification/forward', data).then(
      (response) => {
        if (response.data.status == true) {
          dispatch(closeLoading())
          navigate('/document/list')
        }
      },
      (error) => {
        console.log(error)
      }
    )
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
          <StepInit step={3} />
        </Layout>
      </Box>
      <div className="row mt-5">
        <div className="col-lg-12 d-flex justify-content-between">
          <div className="col-lg-8">
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'Quicksand',
                fontWeight: 'bold',
                color: '#2261c7',
              }}
            >
              <AutoGraph /> SIGNED DOCUMENT
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PdfViewer />
            </div>
          </div>
          <div
            className="col-lg-4"
            style={{ fontFamily: 'Quicksand', fontWeight: 'bold' }}
          >
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'Quicksand',
                fontWeight: 'bold',
                color: '#2261c7',
              }}
            >
              <InfoIcon /> RECIPIENT INFO
            </div>
            <div className="column mt-5">
              <div style={{ textAlign: 'left' }}>
                <label
                  style={{ textDecoration: 'underline', color: '#2261c7' }}
                >
                  <AccountBoxIcon /> Fullname:
                </label>
                <p>Nguyen Ba Khuong</p>
              </div>
              <div style={{ textAlign: 'left' }}>
                <label
                  style={{ textDecoration: 'underline', color: '#2261c7' }}
                >
                  <EmailIcon />
                  Email:
                </label>
                <p>khuong16lop9a6@gmail.com</p>
              </div>
            </div>
            <button
              type={'button'}
              onClick={() => {
                sendForward()
              }}
              className="btn btnPress"
              style={{ fontFamily: 'Quicksand', fontWeight: 'bold' }}
            >
              {' '}
              Forward <ArrowCircleRightIcon />{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review
