import React from 'react'
import Box from '@mui/material/Box'
import HomePageFeature from '../components/HomePageFeature.jsx'
import Layout from '../components/Layout/index.jsx'

const HomePage = () => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default HomePage

// export default withAuthenticationRequired(HomePage, {
//   onRedirecting: () => <Loading/>,
// });
