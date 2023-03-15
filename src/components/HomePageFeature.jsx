import Box from '@mui/material/Box'
import Image from 'mui-image'
import Typography from '@mui/material/Typography'
import React from 'react'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CheckCircle } from '@mui/icons-material'

const HomePageFeature = ({
  imageSrc,
  featureTitle,
  featureDetails,
  navigate,
}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width={150} height={150} borderRadius="50%" bgcolor="transparent">
        <Box alignItems="center" onClick={navigate}>
          <Image
            src={imageSrc}
            width={150}
            height={150}
            duration={0}
            style={{ alignSelf: 'center' }}
            className="step-header-container"
          />
        </Box>
      </Box>
      <Typography
        fontWeight="bold"
        fontSize={20}
        marginTop={1}
        style={{ fontFamily: 'Quicksand' }}
        className="step-header-container"
        onClick={navigate}
      >
        {featureTitle}
      </Typography>
      <List>
        {featureDetails.map((feature, index) => (
          <ListItem key={`feature-${index}`}>
            <ListItemAvatar>
              <Avatar>
                <CheckCircle />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={feature}
              primaryTypographyProps={{ style: { fontFamily: 'Quicksand' } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default HomePageFeature
