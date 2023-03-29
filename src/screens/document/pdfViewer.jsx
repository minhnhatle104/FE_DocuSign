import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  ScrollMode,
} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './css/pdf.viewer.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {
  closeLoading,
  displayLoading,
} from '../../../redux/slice/loadingSlice.js'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {useCallback} from "react";
import axiosConfig from "../../utils/axiosConfig.js";
import Image from "mui-image";
import {StyledIconButton, StyledTablePagination} from "../signature/ManageSignature/styles.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import CreateSignature from "../signature/CreateSignature/index.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function PdfViewer({ isShowChooseImage, recipientList, fileNamePdf, urlPdf }) {
  const navigate = useNavigate()
  const [signatureList, setSignatureList] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [value, setValue] = useState(0)
  const [imageTab1, setImageTab1] = useState('')
  const [page, setPage] = useState(0)

  const [currentPage, setCurrentPage] = useState(0)
  const [pdfFile, setPDFFile] = useState(false)

  const [pdfFrameWidth, setFrameWidth] = useState(0)
  const [pdfFrameHeight, setFrameHeight] = useState(0)
  const [fileHeight, setFileHeight] = useState(0)
  const [fileWidth, setFileWidth] = useState(0)

  const [imageHeight, setIMGHeight] = useState(0)
  const [imageWidth, setIMGWidth] = useState(0)

  const imageRef = useRef(null)
  const fullRef = useRef(null)
  const viewerContainerRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dispatch = useDispatch()
  const userId = localStorage.getItem('uid')

  const handleViewerLoad = () => {
    const viewerContainerRect =
        viewerContainerRef.current.getBoundingClientRect()
    // console.log(`Viewer position: (${viewerContainerRect.left}, ${viewerContainerRect.top})`);
  }

  const handleFetchSignatureList = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
        .get('https://group07-be-signature.onrender.com/api/signature/all')
        .then(
            (response) => {
              dispatch(closeLoading())
              setSignatureList(response.data.result.signatures || [])
            },
            (error) => {
              console.log(error)
              dispatch(closeLoading())
            }
        )
  }, [dispatch])

  useEffect(() => {
    handleFetchSignatureList()
  }, [dispatch, handleFetchSignatureList])


  function fetchSizeData() {
    dispatch(displayLoading())
    if(signatureList.length>0) {
      const data = {
        fileName: `user/${userId}/documents/${fileNamePdf}`,
        imageName: signatureList[0].file_url,
      }

      axios
          .post(
              'http://localhost:6060/api/document/fileDimension',
              data
          )
          .then(
              (response) => {
                console.log(response)
                setFileHeight(response.data.fileHeight + 50)
                setFileWidth(response.data.fileWidth + 30)
                setIMGHeight(response.data.imageHeight)
                setIMGWidth(response.data.imageWidth)
                console.log(imageWidth)
                setPDFFile(true)
                dispatch(closeLoading())
              },
              (error) => {
                console.log(error)
              }
          )
    }
  }
  fetchSizeData();

  // useEffect(() => {
  //   fetchSizeData()
  // }, [dispatch, fetchSizeData])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber.currentPage)
  }

  const newplugin = defaultLayoutPlugin()

  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0]
  //   console.log(file.width)
  //   const reader = new FileReader()
  //
  //   reader.onload = (event) => {
  //     setImage(event.target.result)
  //   }
  //   reader.readAsDataURL(file)
  // }

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

  ///---
  useLayoutEffect(() => {
    setFrameWidth(fullRef.current.offsetWidth)
    setFrameHeight(fullRef.current.offsetHeight)
  }, [])

  //// cal position
  async function CalCoordinates() {
    const leftToBear =
        position.x - viewerContainerRef.current.getBoundingClientRect().left
    const page = parseInt(fileWidth)
    const ratio = (leftToBear + 25) / page

    const bottomSize =
        (fileHeight - position.y - parseInt(imageHeight / 2) - 35) / fileHeight //60 là height ảnh / 2
    console.log(ratio + ' - ' + bottomSize)
    const data = {
      x_coor: parseFloat(ratio.toFixed(3)),
      y_coor: parseFloat(bottomSize.toFixed(3)),
      current_page: currentPage,
      fileName: `user/${userId}/documents/${fileNamePdf}`,
      imageFile: imageTab1,
    }
    dispatch(displayLoading())
    await axios
        .post('http://localhost:6060/api/document/sign', data)
        .then(
            (response) => {
              if (response.data.message == 'Success') {
                dispatch(closeLoading())
                navigate('/document/review', { state: {recipientList, fileNamePdf, urlPdf} })
              }
            },
            (error) => {
              console.log(error)
            }
        )
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])


  return (
      <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="col-lg-12 d-flex justify-content-between">
          {isShowChooseImage && (
              <div className="col-lg-4">
                <Box>
                  <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginBottom: 1,
                      }}
                  >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                      <Tab
                          label="Your Signature"
                          {...a11yProps(0)}
                          sx={{ '&.Mui-selected': { outline: 'none' } }}
                      />
                      <Tab
                          label="Import from computer"
                          {...a11yProps(1)}
                          sx={{ '&.Mui-selected': { outline: 'none' } }}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    {signatureList.length ? (
                        <TableContainer
                            component={Paper}
                            sx={{ marginTop: '1rem', width: '100%' }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Image</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {signatureList
                                  .slice(page * 3, (page + 1) * 3)
                                  .map((signature, index) => (
                                      <TableRow key={signature.file_name}>
                                        <TableCell>{page * 3 + index + 1}</TableCell>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => setImageTab1(signature.file_url)}
                                        >
                                          <Image
                                              sx={{ objectFit: 'contain!important' }}
                                              src={signature.file_url}
                                              width={100}
                                              height={100}
                                              duration={0}
                                          />
                                        </TableCell>
                                      </TableRow>
                                  ))}
                            </TableBody>
                            <StyledTablePagination
                                rowsPerPageOptions={[]}
                                count={signatureList.length}
                                rowsPerPage={3}
                                page={page}
                                onPageChange={handleChangePage}
                            />
                          </Table>
                        </TableContainer>
                    ) : (
                        <Alert sx={{ marginTop: '1rem' }} severity="info">
                          You have not added any signatures yet
                        </Alert>
                    )}
                    {imageTab1 && (
                        <img
                            src={imageTab1}
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
                    {imageTab1 && (
                        <button
                            className="btn btnViewPdf btnPress"
                            onClick={() => CalCoordinates()}
                            style={{
                              fontFamily: 'Quicksand',
                              fontWeight: 'bold',
                              height: 'fit-content',
                              width: 'fit-content',
                              marginTop: '10px'
                            }}
                        >
                          Apply Signature
                        </button>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div
                        style={{
                          fontFamily: 'Quicksand',
                          fontWeight: 'bold',
                          justifyContent: 'space-between',
                          display: 'flex',
                        }}
                        className="row"
                    >
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setOpenCreateModal(true)}
                      >
                        Add new signature
                      </Button>
                      <CreateSignature
                          open={openCreateModal}
                          handleClose={() => setOpenCreateModal(false)}
                          handleFetchSignatureList={handleFetchSignatureList}
                      />
                    </div>
                  </TabPanel>
                </Box>
              </div>
          )}
          <div
              ref={fullRef}
              className="col-lg-8"
              style={{
                fontSize: '12px',
                fontFamily: 'Quicksand',
                fontWeight: 'bold',
              }}
          >
            {pdfFile == true && (
                <div
                    className="pdf-container"
                    style={{
                      fontSize: '12px',
                      height: fileHeight + 'px',
                      width: fileWidth + 'px',
                    }}
                    ref={viewerContainerRef}
                >
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <>
                      <Viewer
                          defaultScale={SpecialZoomLevel.PageWidth}
                          scrollMode={ScrollMode.Page}
                          onPageChange={handlePageChange}
                          onDocumentLoad={handleViewerLoad}
                          fileUrl={urlPdf}
                          plugins={[newplugin]}
                      />
                    </>
                  </Worker>
                </div>
            )}
          </div>
        </div>
      </div>
  )
}

export default PdfViewer
