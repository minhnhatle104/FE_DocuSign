import React, { useCallback, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { createTheme, ThemeProvider } from '@mui/material'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete.js'
import DownloadIcon from '@mui/icons-material/Download'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import {
  StyledIconButton,
  StyledTablePagination,
} from '../signature/ManageSignature/styles.js'
import DeleteDocument from './DeleteDocument/index.jsx'
import { StyledTableCell } from './css/style.js'
import axiosConfig from '../../utils/axiosConfig.js'
import { useDispatch } from 'react-redux'
import {
  closeLoading,
  displayLoading,
} from '../../../redux/slice/loadingSlice.js'
import Swal from 'sweetalert2'

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
      fontStyle: 'italic',
    },
  },
})

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

function ListDocs() {
  const navigate = useNavigate()
  const [value, setValue] = useState(0)
  const [documentList, setDocumentList] = useState([])
  const [documentListOther, setDocumentListOther] = useState([])

  const [documentListMongo, setDocumentListMongo] = useState([])
  const [documentListOtherMongo, setDocumentListOtherMongo] = useState([])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [deleteId, setDeleteId] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isShow: false,
    doc_id: null,
  })
  const userId = localStorage.uid
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const navigateToViewPdf = (filename, createdID) => {
    navigate('/document/viewPDF', {
      state: { filename, uid:createdID },}
    )
  }
  const navigateToCreateNewDocument = () => {
    navigate('/document/upload')
  }
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal({
      isShow: false,
      debt_id: null,
    })
  }
  const handleFetchDocsListOwned = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
      .get(
        'http://localhost:80/api/document/owned/' +
          userId +
          ''
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          setDocumentList(response.data.list)
        },
        (error) => {
          dispatch(closeLoading())
        }
      )
  }, [dispatch, userId])
  const handleFetchDocsListOther = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
        .get(
            'http://localhost:80/api/document/other/' +
            userId +
            ''
        )
        .then(
            (response) => {
              dispatch(closeLoading())
              setDocumentListOther(response.data.list)
            },
            (error) => {
              dispatch(closeLoading())
            }
        )
  }, [dispatch, userId])


  const handleFetchDocsListOwnedMongo = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
      .get(
        'http://localhost:80/api/document/ownedByKey/' +
          userId +
          ''
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          setDocumentListMongo(response.data.list)
        // setTimeout(()=>{
          //     console.log(documentList)
          // }, 2000)
        },
        (error) => {
          dispatch(closeLoading())
        }
      )
  }, [dispatch, userId])
  const handleFetchDocsListOtherMongo = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
      .get(
        'http://localhost:80/api/document/otherByKey/' +
          userId +
          ''
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          setDocumentListOtherMongo(response.data.list)
        },
        (error) => {
          dispatch(closeLoading())
        }
      )
  }, [dispatch, userId])


  const handleDeleteDoc = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
      .delete(
        'http://localhost:80/api/document/' +
          openDeleteModal.doc_id +
          '',
        {}
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          setPage(0)
          handleFetchDocsListOwned()
          handleFetchDocsListOther()
          setOpenDeleteModal({
            isShow: false,
            doc_id: null,
          })
        },
        (error) => {
          dispatch(closeLoading())
        }
      )
  }, [
    dispatch,
    openDeleteModal.doc_id,
    handleFetchDocsListOwned,
    handleFetchDocsListOther,
  ])

  const handleDownloadDocument = useCallback(
    (id) => {
      dispatch(displayLoading())
      axiosConfig
        .get(
          `http://localhost:80/api/document/download/${id}`
        )
        .then(
          (response) => {
            dispatch(closeLoading())
            Swal.fire({
              title: 'SUCCESS !',
              html: `<h3 class="text-success">Check your Downloads folder!</h3>`,
              icon: 'success',
              confirmButtonText: 'OK',
            })
          },
          (error) => {
            dispatch(closeLoading())
            Swal.fire({
              title: 'ERROR !',
              html: `<h3 class="text-danger">Can not download this document!</h3>`,
              icon: 'error',
              confirmButtonText: 'OK',
            })
          }
        )
    },
    [dispatch]
  )

  useEffect(() => {
    handleFetchDocsListOwned()
    handleFetchDocsListOther()
    handleFetchDocsListOwnedMongo()
    handleFetchDocsListOtherMongo()

  }, [dispatch, handleFetchDocsListOwned, handleFetchDocsListOther, handleFetchDocsListOwnedMongo, handleFetchDocsListOtherMongo])
  return (
    <>
      <Layout>
        <Box
          marginTop={10}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ fontFamily: 'Quicksand', fontWeight: 'bold' }}
          >
            Documents List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToCreateNewDocument}
          >
            Upload
          </Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 1 }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Self Made"
                {...a11yProps(0)}
                sx={{ '&.Mui-selected': { outline: 'none' } }}
              />
            <Tab
                label="Self Made With Keys"
                {...a11yProps(1)}
                sx={{ '&.Mui-selected': { outline: 'none' } }}
            />
              <Tab
                label="Other Made"
                {...a11yProps(2)}
                sx={{ '&.Mui-selected': {outline: 'none' }}}
              />
            <Tab
                label="Other Made With Keys"
                {...a11yProps(3)}
                sx={{ '&.Mui-selected': {outline: 'none' }}}
            />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Name file</StyledTableCell>
                    <StyledTableCell>Sign Type</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document, index) => (
                      <TableRow key={document.filename}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.filename}</Typography>
                            <Typography
                              variant="subtitle1"
                              style={{ marginTop: 10 }}
                            >
                              To:{' '}
                              {document.infoReceive.map((item) => {
                                return <div>{item}</div>
                              })}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.isSignKey == true?"Sign With Keys": "Basic Sign"}</Typography>
                          </ThemeProvider>
                        </TableCell>
                        {document.status == 1 ? (
                          <TableCell sx={{ color: '#5D9C59' }}>
                            Completed
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: '#F96666' }}>
                            Note Completed
                          </TableCell>
                        )}

                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.formatDate}</Typography>
                            <Typography variant="subtitle1">
                              {document.formatHour}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <StyledIconButton
                            size="small"
                            onClick={()=>{navigateToViewPdf(document.filename, document.userCreateID)}}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() =>
                              handleDownloadDocument(document.filename)
                            }
                          >
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => {
                              setDeleteId(document.filename)
                              setOpenDeleteModal({
                                isShow: true,
                                doc_id: document.filename,
                              })
                            }}
                          >
                            <DeleteIcon fontSize="inherit" color="error" />
                          </StyledIconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <StyledTablePagination
                  rowsPerPageOptions={[]}
                  count={documentList.length}
                  rowsPerPage={3}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Name file</StyledTableCell>
                    <StyledTableCell>Sign Type</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentListMongo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document, index) => (
                      <TableRow key={document.filename}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.filename}</Typography>
                            <Typography
                              variant="subtitle1"
                              style={{ marginTop: 10 }}
                            >
                              To:{' '}
                              {document.infoReceive.map((item) => {
                                return <div>{item}</div>
                              })}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.isSignKey == true?"Sign With Keys": "Basic Sign"}</Typography>
                          </ThemeProvider>
                        </TableCell>
                        {document.status == 1 ? (
                          <TableCell sx={{ color: '#5D9C59' }}>
                            Completed
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: '#F96666' }}>
                            Note Completed
                          </TableCell>
                        )}

                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.formatDate}</Typography>
                            <Typography variant="subtitle1">
                              {document.formatHour}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <StyledIconButton
                            size="small"
                            onClick={()=>{navigateToViewPdf(document.filename, document.userCreateID)}}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() =>
                              handleDownloadDocument(document.filename)
                            }
                          >
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => {
                              setDeleteId(document.filename)
                              setOpenDeleteModal({
                                isShow: true,
                                doc_id: document.filename,
                              })
                            }}
                          >
                            <DeleteIcon fontSize="inherit" color="error" />
                          </StyledIconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <StyledTablePagination
                  rowsPerPageOptions={[]}
                  count={documentListMongo.length}
                  rowsPerPage={3}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Name file</StyledTableCell>
                    <StyledTableCell>Sign Type</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentListOther
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document, index) => (
                      <TableRow key={document.filename}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.filename}</Typography>
                            <Typography variant="subtitle1">
                              From: {document.createrName}
                              {document.infoReceive.map((item) => {
                                return <div>{item}</div>
                              })}
                            </Typography>

                          </ThemeProvider>
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.isSignKey == true?"Sign With Keys": "Basic Sign"}</Typography>
                          </ThemeProvider>
                        </TableCell>
                        {document.status == 1 ? (
                          <TableCell sx={{ color: '#5D9C59' }}>
                            Completed
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: '#F96666' }}>
                            Not Completed
                          </TableCell>
                        )}
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.formatDate}</Typography>
                            <Typography variant="subtitle1">
                              {document.formatHour}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <StyledIconButton
                            size="small"
                            onClick={()=>{navigateToViewPdf(document.filename, document.userCreateID)}}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => handleDownloadDocument(document.filename)}
                          >
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <StyledTablePagination
                  rowsPerPageOptions={[]}
                  count={documentList.length}
                  rowsPerPage={3}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>No.</StyledTableCell>
                    <StyledTableCell>Name file</StyledTableCell>
                    <StyledTableCell>Sign Type</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentListOtherMongo
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document, index) => (
                      <TableRow key={document.filename}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.filename}</Typography>
                            <Typography variant="subtitle1">
                              From: {document.createrName}
                              {document.infoReceive.map((item) => {
                                return <div>{item}</div>
                              })}
                            </Typography>

                          </ThemeProvider>
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.isSignKey == true?"Sign With Keys": "Basic Sign"}</Typography>
                          </ThemeProvider>
                        </TableCell>
                        {document.status == 1 ? (
                          <TableCell sx={{ color: '#5D9C59' }}>
                            Completed
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: '#F96666' }}>
                            Not Completed
                          </TableCell>
                        )}
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.formatDate}</Typography>
                            <Typography variant="subtitle1">
                              {document.formatHour}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <StyledIconButton
                            size="small"
                            onClick={()=>{navigateToViewPdf(document.filename, document.userCreateID)}}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => handleDownloadDocument(document.filename)}
                          >
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <StyledTablePagination
                  rowsPerPageOptions={[]}
                  count={documentListOtherMongo.length}
                  rowsPerPage={3}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </Table>
            </TableContainer>
          </TabPanel>
        </Box>

        <DeleteDocument
          open={openDeleteModal.isShow}
          onClose={handleCloseDeleteModal}
          onClickCancel={handleCloseDeleteModal}
          onClickConfirm={handleDeleteDoc}
        />
      </Layout>
    </>
  )
}

export default ListDocs
