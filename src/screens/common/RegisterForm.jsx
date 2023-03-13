import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmailIcon from '@mui/icons-material/Email'
import AppLogoCenter from '../../components/AppLogoCenter.jsx'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUpApi } from '../../../redux/thunk/authThunk.js'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [showConPassword, setShowConPassword] = useState(false)
  const handleClickShowConPassword = () => setShowConPassword(!showConPassword)
  const handleMouseDownConPassword = () => setShowConPassword(!showConPassword)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .required('Required!'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Password's not match")
        .required('Required!'),
    }),
    onSubmit: async (values) => {
      await dispatch(signUpApi(values))
      navigate("/")
    },
  })

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <AppLogoCenter />
      <Typography
        style={{ fontSize: 30, marginTop: 10, fontFamily: 'Quicksand' }}
      >
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: 400 }}>
          <TextField
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{
              style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
            }}
            label="Fullname"
            name="full_name"
            id="full_name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Enter your name"
            style={{ marginTop: 15 }}
            size="small"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.full_name && formik.touched.full_name ? (
            <Typography
              style={{
                fontFamily: 'Quicksand',
                color: '#e8e409',
                fontWeight: 'bold',
              }}
            >
              {formik.errors.full_name}
            </Typography>
          ) : null}
          <TextField
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{
              style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
            }}
            label="Email"
            name="email"
            id="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="example@gmail.com"
            style={{ marginTop: 15 }}
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
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
          <TextField
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{
              style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
            }}
            label="Phone Number"
            name="phone_number"
            id="phone_number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Enter your phone"
            style={{ marginTop: 15 }}
            size="small"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone_number && formik.touched.phone_number ? (
            <Typography
              style={{
                fontFamily: 'Quicksand',
                color: '#e8e409',
                fontWeight: 'bold',
              }}
            >
              {formik.errors.phone_number}
            </Typography>
          ) : null}
          <TextField
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{
              style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
            }}
            label="Password"
            name="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Enter your password"
            style={{ marginTop: 15 }}
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <Typography
              style={{
                fontFamily: 'Quicksand',
                color: '#e8e409',
                fontWeight: 'bold',
              }}
            >
              {formik.errors.password}
            </Typography>
          ) : null}
          <TextField
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{
              style: { fontFamily: 'Quicksand', fontWeight: 'bold' },
            }}
            label="Confirm Password"
            name="confirm_password"
            id="confirm_password"
            type={showConPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUserIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConPassword}
                    onMouseDown={handleMouseDownConPassword}
                  >
                    {showConPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Confirm your password"
            style={{ marginTop: 15 }}
            size="small"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirm_password && formik.touched.confirm_password ? (
            <Typography
              style={{
                fontFamily: 'Quicksand',
                color: '#e8e409',
                fontWeight: 'bold',
              }}
            >
              {formik.errors.confirm_password}
            </Typography>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            style={{
              marginTop: 15,
              fontSize: 16,
              fontFamily: 'Quicksand',
              fontWeight: 'bold',
            }}
            onClick={formik.handleSubmit}
          >
            REGISTER
          </Button>
        </FormControl>
      </form>
      <Box display="flex" style={{ marginTop: 10 }}>
        <Typography style={{ fontFamily: 'Quicksand' }}>
          Already have an account?{' '}
        </Typography>
        <Link
          style={{ marginLeft: 5, fontFamily: 'Quicksand', fontWeight: 'bold' }}
          component="button"
          variant="body2"
          onClick={() => {
            navigate('/')
          }}
        >
          Log in
        </Link>
      </Box>
    </Box>
  )
}
