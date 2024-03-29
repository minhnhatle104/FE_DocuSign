import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import Image from 'mui-image'
import SettingsIcon from '@mui/icons-material/Settings'
import LanguageIcon from '@mui/icons-material/Language'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import { useNavigate } from 'react-router-dom'
import AccountMenu from '../AccountMenu/AccountMenu'

const Header = () => {
  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  const navigate = useNavigate()

  const navigateToHomepage = () => {
    navigate('/')
  }

  return (
    <AppBar>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="app-logo"
            onClick={navigateToHomepage}
          >
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
          </Box>
          <Box ml={2}>
            <Button
                id="mySignaturesBtn"
              sx={{ textTransform: 'capitalize', color: 'white' }}
              variant="outlined"
              onClick={() => navigate('/signature-management')}
            >
              <AutoGraphIcon />
              <Typography ml={1} component="span">
                My signatures
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <AccountMenu />
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
  )
}

export default Header
