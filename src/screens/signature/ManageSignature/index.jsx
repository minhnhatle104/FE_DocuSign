import {
  Box,
  Button,
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
import CreateSignature from '../CreateSignature'
import { StyledDialog, StyledIconButton, StyledTablePagination } from './styles'
import DeleteSignature from '../DeleteSignature'
import axios from 'axios'
// import axios from 'axios'

const ManageSignature = () => {
  const [signatureList, setSignatureList] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [page, setPage] = useState(0)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setSignatureList([
      {
        id: 1,
        src: '/img/app_logo.png',
      },
    ])

    // TODO: Integrate with BE
    // axios.get('http://localhost:4040/api/signature').then(
    //   (response) => {
    //     console.log(response)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
  }, [])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const handleDeleteSignature = useCallback(() => {
    // TODO: Integrate with BE
    axios.delete(`http://localhost:4040/api/signature/${deleteId}`).then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [deleteId])

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
            {signatureList.map((signature) => (
              <TableRow key={signature.id}>
                <TableCell>{signature.id}</TableCell>
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setUrl(signature.src)}
                >
                  <Image
                    src={signature.src}
                    width={100}
                    height={100}
                    duration={0}
                  />
                </TableCell>
                <TableCell>
                  <StyledIconButton
                    size="medium"
                    onClick={() => {
                      setDeleteId(signature.id)
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
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Table>
      </TableContainer>
      <StyledDialog open={!!url.length} onClose={() => setUrl('')}>
        <Box>
          <Image src={url} />
        </Box>
      </StyledDialog>
      <CreateSignature
        open={openCreateModal}
        handleClose={() => setOpenCreateModal(false)}
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
