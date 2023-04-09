import React, { useEffect } from 'react'
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const RecipientAdditionBox = ({
  recipient,
  index,
  handleChangeError,
  handleDeleteItem,
  handleChangeRecipientName,
  handleChangeRecipientEmail,
  handleChangeRecipientPermission,
}) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format!').required('Required!'),
      name: Yup.string().required('Required!'),
    }),
  })

  const handleClickDeleteButton = () => {
    handleDeleteItem(index)
  }

  const handleChangeEmail = (e) => {
    handleChangeRecipientEmail(index, e.target.value)
  }

  const handleChangeName = (e) => {
    handleChangeRecipientName(index, e.target.value)
  }

  const handleChangePermission = (e) => {
    handleChangeRecipientPermission(index, e.target.value)
  }

  useEffect(() => {
    if (formik.errors.name || formik.errors.email) {
      handleChangeError(true)
    } else {
      handleChangeError(false)
    }
  }, [formik.errors.name, formik.errors.email, handleChangeError])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      bgcolor="white"
      padding={2}
      borderRadius={1}
      boxShadow={3}
      marginBottom={5}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 150 }}
          size="medium"
        >
          <Select
            value={recipient.permission}
            onChange={handleChangePermission}
          >
            <MenuItem value="Needs to sign">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CreateIcon fontSize="small" style={{ marginRight: 5 }} />
                <Typography>Needs to sign</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="Needs to view">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <VisibilityIcon fontSize="small" style={{ marginRight: 5 }} />
                <Typography>Needs to view</Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleClickDeleteButton}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <TextField
        name="name"
        id={`name-${index}`}
        style={{
          width: '50%',
        }}
        variant="outlined"
        required
        label="Enter name"
        inputProps={{ style: { fontFamily: 'Quicksand' } }}
        InputLabelProps={{
          style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
        }}
        size="small"
        value={recipient.name}
        onChange={(e) => {
          formik.handleChange(e)
          handleChangeName(e)
        }}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? (
        <Typography
          style={{
            fontFamily: 'Quicksand',
            color: '#e8e409',
            fontWeight: 'bold',
          }}
        >
          {formik.errors.name}
        </Typography>
      ) : null}
      <TextField
        name="email"
        id={`email-${index}`}
        style={{
          marginTop: 10,
          width: '50%',
        }}
        variant="outlined"
        required
        label="Enter email"
        type="email"
        inputProps={{ style: { fontFamily: 'Quicksand' } }}
        InputLabelProps={{
          style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
        }}
        size="small"
        value={recipient.email}
        onChange={(e) => {
          formik.handleChange(e)
          handleChangeEmail(e)
        }}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? (
        <Typography
          style={{
            fontFamily: 'Quicksand',
            color: '#e8e409',
            fontWeight: 'bold',
          }}
        >
          {formik.errors.email}
        </Typography>
      ) : null}
    </Box>
  )
}

export default RecipientAdditionBox
