import React from 'react'
import Box from '@mui/material/Box'
import HomePageFeature from '../../components/HomePageFeature.jsx'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const navigateToCreateNewDocument = () => {
    navigate('/document/upload')
  }
  const navigateToManageDocument = () => {
    navigate('/document/list')
  }

  return (
    <Layout>
      <Box marginTop={20} fontFamily="Roboto">
        <Box display="flex" justifyContent="space-around">
          <HomePageFeature
            imageSrc="/img/create_new_document.png"
            featureTitle="Create New Document"
            featureDetails={[
              'Choose file',
              'Insert your signature and information',
              'Add recipient',
              'Verify and send document',
            ]}
            navigate={navigateToCreateNewDocument}
          />
          <HomePageFeature
            imageSrc="/img/document_management.png"
            featureTitle="Manage Document"
            featureDetails={['Classify document', 'Support quickly']}
            navigate={navigateToManageDocument}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default HomePage
