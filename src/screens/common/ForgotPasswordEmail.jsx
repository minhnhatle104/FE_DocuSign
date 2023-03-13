import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2'

import AppLogoCenter from '../../components/AppLogoCenter.jsx'

const ForgotPasswordEmail = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required!'),
    }),
    onSubmit: (value) => {
      const auth = getAuth();
      sendPasswordResetEmail(auth, value.email)
        .then(() => {
          Swal.fire({
            title: 'SUCCESS',
            html:`<h3 class="text-success">Send email successfully !</h3>`,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          navigate("/login")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: 'ERROR !',
            html: `<h3 class="text-danger">${errorMessage}</h3>`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
    },
  })

  return (
    <>
      <AppLogoCenter />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          style={{ fontSize: 30, marginTop: 10, fontFamily: 'Quicksand' }}
        >
          FORGOT PASSWORD
        </Typography>
        <Box>
          <Typography style={{ marginTop: 30, fontFamily: 'Quicksand' }}>
            We'll send a link to your email:
          </Typography>
          <TextField
            sx={{ width: 400 }}
            label="example@gmail.com"
            size="small"
            id="email"
            name="email"
            inputProps={{ style: { fontFamily: 'Quicksand' } }}
            InputLabelProps={{ style: { fontFamily: 'Quicksand' } }}
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
        </Box>
        <Box>
          <Button
            sx={{ width: 400 }}
            style={{ marginTop: 10, fontFamily: 'Quicksand' }}
            variant="contained"
            color="primary"
            endIcon={<EastIcon />}
            onClick={formik.handleSubmit}
          >
            Send
          </Button>
        </Box>
        <Box marginTop={10}>
          <Link
            to="/"
            style={{
              color: '#000000',
              textDecoration: 'underline',
              fontFamily: 'Quicksand',
            }}
          >
            Back to login
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPasswordEmail
