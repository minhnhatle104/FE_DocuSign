import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Image from 'mui-image'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LanguageIcon from '@mui/icons-material/Language.js'
import AccountCircle from '@mui/icons-material/AccountCircle.js'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React from 'react'
import MoreIcon from '@mui/icons-material/MoreVert'
import SettingsIcon from '@mui/icons-material/Settings'
import PdfViewer from './pdfViewer.jsx'
import '/src/assets/css/style.css'

function SignPdf() {
  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'
  return (
    <>
      <Box sx={{ flexGrow: 1 }} fontFamily="Quicksand">
        <AppBar>
          <Toolbar>
            <Image
              src="/img/app_logo.png"
              width={50}
              height={50}
              duration={0}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ marginLeft: 10, fontFamily: 'Quicksand' }}
            >
              SignaText
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <LanguageIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box marginTop={10} fontFamily="Roboto">
          <Button variant="contained">Back To HomePage</Button>
        </Box>
        <StepInit step={2} />
        <PdfViewer />
      </Box>
    </>
  )
}

export default SignPdf
