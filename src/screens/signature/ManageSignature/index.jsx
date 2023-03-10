import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import CreateSignature from '../CreateSignature'

const ManageSignature = () => {
  const [openSignModal, setOpenSignModal] = useState(false)

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
          onClick={() => setOpenSignModal(true)}
        >
          Add new signature
        </Button>
      </Box>
      <CreateSignature
        open={openSignModal}
        handleClose={() => setOpenSignModal(false)}
      />
    </Layout>
  )
}

export default ManageSignature
