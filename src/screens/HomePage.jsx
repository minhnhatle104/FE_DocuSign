import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import Image from 'mui-image'
import SettingsIcon from '@mui/icons-material/Settings'
import LanguageIcon from '@mui/icons-material/Language'
import HomePageFeature from '../components/HomePageFeature.jsx'

const HomePage = () => {
  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Image
            src="/src/assets/images/app_logo.png"
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
      <Box marginTop={20} fontFamily="Roboto">
        <Box display="flex" justifyContent="space-around">
          <HomePageFeature
            imageSrc="/src/assets/images/create_new_document.png"
            featureTitle="Create New Document"
            featureDetails={[
              'Choose file',
              'Insert your signature and information',
              'Add recipient',
              'Verify and send document',
            ]}
          />
          <HomePageFeature
            imageSrc="/src/assets/images/document_management.png"
            featureTitle="Manage Document"
            featureDetails={['Classify document', 'Support quickly']}
          />
          <HomePageFeature
            imageSrc="/src/assets/images/template_management.png"
            featureTitle="Manage Template"
            featureDetails={[
              'Create, edit, delete your template',
              'Support quickly',
            ]}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
