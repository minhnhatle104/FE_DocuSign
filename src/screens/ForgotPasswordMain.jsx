import React from 'react'
import Button from '@mui/material/Button'
import AppLogoCenter from '../components/AppLogoCenter.jsx'
import { Box, TextField, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East.js'
import { useNavigate } from 'react-router-dom'

const ForgotPasswordMain = () => {
  const navigate = useNavigate()

  return (
    <>
      <AppLogoCenter />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        fontFamily="Roboto"
      >
        <Typography
          style={{ fontSize: 30, marginTop: 10, fontFamily: 'Quicksand' }}
        >
          FORGOT PASSWORD
        </Typography>
        <Box>
          <Typography
            style={{ marginTop: 20, marginBottom: 10, fontFamily: 'Quicksand' }}
          >
            Updating your new password:
          </Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              sx={{ width: 400 }}
              label="New password"
              size="small"
              type="password"
              inputProps={{ style: { fontFamily: 'Quicksand' } }}
              InputLabelProps={{ style: { fontFamily: 'Quicksand' } }}
            />
            <TextField
              sx={{ width: 400 }}
              style={{ marginTop: 10 }}
              label="Confirm password"
              size="small"
              type="password"
              inputProps={{ style: { fontFamily: 'Quicksand' } }}
              InputLabelProps={{ style: { fontFamily: 'Quicksand' } }}
            />
          </Box>
        </Box>
        <Box>
          <Button
            sx={{ width: 400 }}
            style={{ marginTop: 10, fontFamily: 'Quicksand' }}
            variant="contained"
            color="primary"
            endIcon={<EastIcon />}
            onClick={() => navigate('/')}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPasswordMain
