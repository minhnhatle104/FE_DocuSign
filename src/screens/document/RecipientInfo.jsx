import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import StepInit from './StepInit.jsx'
import React, { useState } from 'react'
import Layout from '../../components/Layout/index.jsx'
import { useNavigate } from 'react-router-dom'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import RecipientAdditionBox from './RecipientAdditionBox.jsx'

function RecipientInfo() {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const [recipientList, setRecipientList] = useState([
    {
      name: '',
      email: '',
      permission: 'Needs to sign',
    },
  ])
  const [isError, setIsError] = useState(false)

  const handleChangeCheckBox = (event) => {
    setIsChecked(event.target.checked)
  }

  const handleChangeError = (value) => {
    setIsError(value)
  }

  const handleClickAddButton = () => {
    setRecipientList([
      ...recipientList,
      {
        name: '',
        email: '',
        permission: 'Needs to sign',
      },
    ])
  }

  const handleDeleteItem = (index) => {
    setRecipientList(
      recipientList.filter((recipient, recipientIdx) => index !== recipientIdx)
    )
  }

  const handleChangeRecipientName = (index, name) => {
    setRecipientList(
      recipientList.map((recipient, recipientIdx) => {
        if (recipientIdx !== index) return recipient
        return {
          ...recipient,
          name,
        }
      })
    )
  }

  const handleChangeRecipientEmail = (index, email) => {
    setRecipientList(
      recipientList.map((recipient, recipientIdx) => {
        if (recipientIdx !== index) return recipient
        return {
          ...recipient,
          email,
        }
      })
    )
  }

  const handleChangeRecipientPermission = (index, permission) => {
    setRecipientList(
      recipientList.map((recipient, recipientIdx) => {
        if (recipientIdx !== index) return recipient
        return {
          ...recipient,
          permission,
        }
      })
    )
  }

  const navigateToPrevStep = () => {
    navigate('/document/upload')
  }

  const navigateToNextStep = () => {
    let isCompletedForm = true

    if (!isChecked) {
      recipientList.forEach((recipient) => {
        if (recipient.name === '' || recipient.email === '') {
          alert('Please set up recipient info!')
          isCompletedForm = false
        }
      })
    }

    if (isCompletedForm && !isError) {
      navigate('/document/signPDF', { state: { recipientList } })
    } else {
      alert('Please set up recipient info!')
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} fontFamily="Quicksand">
        <Layout>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            marginTop={10}
            fontFamily="Roboto"
          >
            <Box>
              <Button variant="contained" onClick={navigateToPrevStep}>
                Back
              </Button>
            </Box>
            <Box>
              <Button variant="contained" onClick={navigateToNextStep}>
                Next
              </Button>
            </Box>
          </Box>
          <StepInit step={1} />
          <Box
            sx={{ display: 'flex', flexDirection: 'column' }}
            border={1}
            borderRadius={1}
            marginTop={5}
            padding={4}
            bgcolor="#f7f5f5"
          >
            <Typography fontSize={20}>Add Recipients</Typography>
            <Box>
              <FormControlLabel
                style={{
                  marginTop: 5,
                }}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleChangeCheckBox}
                  />
                }
                label={
                  <Typography
                    style={{
                      fontSize: 14,
                      color: '#646464',
                    }}
                  >
                    I'm the only signer
                  </Typography>
                }
              />
            </Box>
            <Box display={isChecked ? 'none' : 'block'}>
              {recipientList.map((recipient, index) => (
                <RecipientAdditionBox
                  key={`{recipient-${index}`}
                  recipient={recipient}
                  index={index}
                  handleDeleteItem={handleDeleteItem}
                  handleChangeRecipientName={handleChangeRecipientName}
                  handleChangeRecipientEmail={handleChangeRecipientEmail}
                  handleChangeRecipientPermission={
                    handleChangeRecipientPermission
                  }
                  handleChangeError={handleChangeError}
                />
              ))}
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PersonAddAltIcon />}
                  onClick={handleClickAddButton}
                >
                  Add recipient
                </Button>
              </Box>
            </Box>
          </Box>
        </Layout>
      </Box>
    </>
  )
}
export default RecipientInfo
