import React, { useRef, useState } from 'react'
import { Box } from '@mui/material'
import Layout from '../../components/Layout/index.jsx'
import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button'
import PdfViewer from './pdfViewer.jsx'
import CreateSignature from '../signature/CreateSignature/index.jsx'
import ModalInfo from './ModalInfo.jsx'

const OtherSign = () => {
  const [image, setImage] = useState(null)
  const [imageHeight, setIMGHeight] = useState(0)
  const [imageWidth, setIMGWidth] = useState(0)
  const imageRef = useRef(null)
  const [position, setPosition] = useState({ x: 20, y: 20 })

  const [isExistedSignature, setIsExistedSignature] = useState(false)
  const [isOpenAnnouncementModal, setIsOpenAnnouncementModal] = useState(false)
  const [isOpenSignatureModal, setIsOpenSignatureModal] = useState(false)
  const [isOpenCompletedModal, setIsOpenCompletedModal] = useState(false)
  const [isOpenDeclinedModal, setIsOpenDeclinedModal] = useState(false)

  const handleOpenAnnouncementModal = () => setIsOpenAnnouncementModal(true)
  const handleCloseAnnouncementModal = () => setIsOpenAnnouncementModal(false)
  const handleOpenSignatureModal = () => setIsOpenSignatureModal(true)
  const handleCloseSignatureModal = () => setIsOpenSignatureModal(false)
  const handleOpenCompletedModal = () => setIsOpenCompletedModal(true)
  const handleCloseCompletedModal = () => setIsOpenCompletedModal(false)
  const handleOpenDeclinedModal = () => setIsOpenDeclinedModal(true)
  const handleCloseDeclinedModal = () => setIsOpenDeclinedModal(false)

  const handleSignButtonClicked = () => {
    if (!isExistedSignature) handleOpenAnnouncementModal()
    else {
      setImage(
        'https://firebasestorage.googleapis.com/v0/b/signatext.appspot.com/o/user%2FKN3MvooRQWZHYznKnEsASTnePwv2%2Fsignatures%2FVgVvsVEbKHOt9CTfTQiSpmhMUCm2_signature_0140d22b-0dd7-4a84-a896-6ee834f1157e.png?alt=media&token=2625eb1e-ab37-4d5b-a270-b63e948108c5'
      )
      setIMGWidth(157)
      setIMGHeight(120)
    }
  }

  const handleMouseDown = (event) => {
    if (imageRef.current) {
      const { clientX, clientY } = event
      const offsetX = clientX - parseInt(imageRef.current.style.left)
      const offsetY = clientY - parseInt(imageRef.current.style.top)
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event
        let left = clientX - offsetX
        let top = clientY - offsetY
        imageRef.current.style.left = `${left}px`
        imageRef.current.style.top = `${top}px`
        setPosition({ x: left, y: top })
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove)
      })
    }
  }

  const navigateToCreateSignature = () => {
    handleCloseAnnouncementModal()
    handleOpenSignatureModal()
    setIsExistedSignature(true)
  }

  return (
    <Box>
      <Layout>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-around' }}
          marginTop={5}
          fontFamily="Roboto"
        >
          <Box>
            <Button
              style={{ marginTop: 30 }}
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={handleSignButtonClicked}
            >
              Sign
            </Button>
            {image && (
              <img
                src={image}
                alt="image"
                ref={imageRef}
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  cursor: 'grab',
                  maxWidth: imageWidth + 'px',
                  maxHeight: imageHeight + 'px',
                  zIndex: 10000,
                }}
                onMouseDown={handleMouseDown}
              />
            )}
          </Box>
          <Box>
            <PdfViewer isShowChooseImage={false} />
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
              marginTop={1}
              marginRight={2}
            >
              <Button
                style={{ marginRight: 5 }}
                variant="outlined"
                color="error"
                onClick={handleOpenDeclinedModal}
              >
                Decline
              </Button>
              <Button variant="contained" onClick={handleOpenCompletedModal}>
                Finish
              </Button>
            </Box>
            <ModalInfo
              open={isOpenAnnouncementModal}
              closeHandler={handleCloseAnnouncementModal}
              okHandler={navigateToCreateSignature}
              header="Don't have signature"
              description="Do you want to create your signature to sign the document?"
            />
            <ModalInfo
              open={isOpenDeclinedModal}
              closeHandler={handleCloseDeclinedModal}
              okHandler={navigateToCreateSignature}
              header="Decline"
              description="Do you want to decline the invitation for signing the document?"
            />
            <ModalInfo
              open={isOpenCompletedModal}
              closeHandler={handleCloseCompletedModal}
              okHandler={navigateToCreateSignature}
              header="Complete"
              description="Do you want to complete the sign process?"
            />
            <CreateSignature
              open={isOpenSignatureModal}
              handleClose={handleCloseSignatureModal}
            />
          </Box>
        </Box>
      </Layout>
    </Box>
  )
}

export default OtherSign
