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
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [deleteId, setDeleteId] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState({
    isShow: false,
    doc_id: null,
  })
  const userId = localStorage.uid;
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const navigateToViewPdf = () => {
    navigate('/document/viewPDF')
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
    axiosConfig.get('http://localhost:3030/api/document/owned/'+userId+'').then(
        (response) => {
          console.log(response)
          dispatch(closeLoading())
          setDocumentList(response.data.list)
        },
        (error) => {
          console.log(error)
          dispatch(closeLoading())
        }
    )
  }, [dispatch])
  const handleFetchDocsListOther = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig.get('http://localhost:3030/api/document/other/'+userId+'').then(
        (response) => {
          console.log(response)
          dispatch(closeLoading())
          setDocumentListOther(response.data.list)
        },
        (error) => {
          console.log(error)
          dispatch(closeLoading())
        }
    )
  }, [dispatch])
  const handleDeleteDoc = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
        .delete('http://localhost:3030/api/document/'+openDeleteModal.doc_id+'', {

        })
        .then(
            (response) => {
              dispatch(closeLoading())
              setPage(0)
              handleFetchDocsListOwned()
              handleFetchDocsListOther()
              setOpenDeleteModal({
                isShow: false,
                doc_id: null
              })
            },
            (error) => {
              dispatch(closeLoading())
              console.log(error)
            }
        )
  }, [deleteId,dispatch,handleFetchDocsListOwned,handleFetchDocsListOther])

  useEffect(() => {
    handleFetchDocsListOwned();
    handleFetchDocsListOther();

  }, [dispatch, handleFetchDocsListOwned,handleFetchDocsListOther])
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
                label="Other Made"
                {...a11yProps(1)}
                sx={{ '&.Mui-selected': { outline: 'none' } }}
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
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document,index) => (
                      <TableRow key={document.Id}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.namefile}</Typography>
                            <Typography variant="subtitle1">
                              To: {document.receiverName}
                            </Typography>
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
                            onClick={navigateToViewPdf}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton size="small">
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => {
                              setDeleteId(document.Id)
                              setOpenDeleteModal({
                                isShow: true,
                                doc_id: document.Id
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
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentListOther
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((document,index) => (
                      <TableRow key={document.Id}>
                        <TableCell component="th" scope="row">
                          {page * 3 + index + 1}
                        </TableCell>
                        <TableCell>
                          <ThemeProvider theme={theme}>
                            <Typography>{document.namefile}</Typography>
                            <Typography variant="subtitle1">
                              From: {document.senderName}
                            </Typography>
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
                            <Typography>{document.date.formatDate}</Typography>
                            <Typography variant="subtitle1">
                              {document.formatHour}
                            </Typography>
                          </ThemeProvider>
                        </TableCell>
                        <TableCell align="right">
                          <StyledIconButton
                            size="small"
                            onClick={navigateToViewPdf}
                          >
                            <RemoveRedEyeRoundedIcon
                              fontSize="inherit"
                              color="#dfdfdf"
                            />
                          </StyledIconButton>
                          <StyledIconButton size="small">
                            <DownloadIcon fontSize="inherit" color="success" />
                          </StyledIconButton>
                          <StyledIconButton
                            size="small"
                            onClick={() => {
                              setDeleteId(document.Id)
                              setOpenDeleteModal({
                                isShow: true,
                                doc_id: document.Id
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
