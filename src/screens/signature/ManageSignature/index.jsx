import {
  Alert,
  Box,
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Image from 'mui-image'
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import axiosConfig from '../../../utils/axiosConfig'
import CreateSignature from '../CreateSignature'
import { StyledIconButton, StyledTablePagination } from './styles'
import DeleteSignature from '../DeleteSignature'
import { useDispatch } from 'react-redux'
import {
  closeLoading,
  displayLoading,
} from '../../../../redux/slice/loadingSlice'

const ManageSignature = () => {
  const [signatureList, setSignatureList] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [deleteFileName, setDeleteFileName] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleFetchSignatureList = useCallback(() => {
    dispatch(displayLoading())
    axiosConfig
      .get('https://group07-be-signature-042m.onrender.com/api/signature/all')
      .then(
        (response) => {
          console.log(response)
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

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const handleDeleteSignature = useCallback(() => {
    setOpenDeleteModal(false)
    dispatch(displayLoading())

    axiosConfig
      .delete(
        'https://group07-be-signature-042m.onrender.com/api/signature/delete',
        {
          data: {
            file_name: deleteFileName,
          },
        }
      )
      .then(
        (response) => {
          dispatch(closeLoading())
          setPage(0)
          handleFetchSignatureList()
          console.log(response)
        },
        (error) => {
          dispatch(closeLoading())
          console.log(error)
        }
      )
  }, [deleteFileName, dispatch, handleFetchSignatureList])

  return (
    <Layout>
      <Box
        marginTop={10}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography component="h1" variant="h5">
          Signature Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateModal(true)}
        >
          Add new signature
        </Button>
      </Box>
      {signatureList.length ? (
        <TableContainer
          component={Paper}
          sx={{ marginTop: '1rem', width: '50%' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
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
                      onClick={() => setUrl(signature.file_url)}
                    >
                      <Image
                        sx={{ objectFit: 'contain!important' }}
                        src={signature.file_url}
                        width={100}
                        height={100}
                        duration={0}
                      />
                    </TableCell>
                    <TableCell>
                      <StyledIconButton
                        size="medium"
                        onClick={() => {
                          setDeleteFileName(signature.file_name)
                          setOpenDeleteModal(true)
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

      <Dialog open={!!url.length} onClose={() => setUrl('')}>
        <Box>
          <Image src={url} />
        </Box>
      </Dialog>
      <CreateSignature
        open={openCreateModal}
        handleClose={() => setOpenCreateModal(false)}
        handleFetchSignatureList={handleFetchSignatureList}
      />
      <DeleteSignature
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onClickCancel={() => setOpenDeleteModal(false)}
        onClickConfirm={handleDeleteSignature}
      />
    </Layout>
  )
}

export default ManageSignature
