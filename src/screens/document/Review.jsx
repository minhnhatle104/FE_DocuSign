import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React from 'react'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'
import { useLocation, useNavigate } from 'react-router-dom'
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
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
const Item = ({ name, email, permission }) => {
  return (
    <Paper>
      <p style={{ fontSize: '15px' }}>
        {' '}
        <AccountBoxIcon />: {name}
      </p>
      <p style={{ fontSize: '15px' }}>
        {' '}
        <EmailIcon />: {email}
      </p>
      <p style={{ fontSize: '15px', color: '#d10f29' }}>
        {' '}
        <BookmarkIcon />: {permission}
      </p>
    </Paper>
  )
}

function Review() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  console.log(state)
  const navigateToPrevStep = () => {
    navigate('/document/signPDF')
  }

  function sendForward() {
    dispatch(displayLoading())
    const userID = localStorage.getItem('uid')


    const data = {
        userID,
        state
    }
    axios
      .post(
        'http://signatext-env-1.eba-ndieaxft.eu-west-1.elasticbeanstalk.com/api/notification/forward',
        data
      )
      .then(
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
              <PdfViewer
                isShowChooseImage={false}
                recipientList={state.recipientList}
                fileNamePdf={state.fileNamePdf}
                urlPdf={state.urlPdf}
              />
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
              <InfoIcon /> RECIPIENT(S) INFO
            </div>
            <div className="mt-5">
              <Carousel>
                {state.recipientList.map((item, i) => (
                  <Item key={i} {...item} />
                ))}
              </Carousel>
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
