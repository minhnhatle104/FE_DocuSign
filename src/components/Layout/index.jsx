import { Box } from '@mui/material'
import React from 'react'
import Header from '../Header'

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box padding={3}>{children}</Box>
    </Box>
  )
}

export default Layout
