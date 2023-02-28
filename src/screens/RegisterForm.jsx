import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import AppLogoCenter from '../components/AppLogoCenter';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showConPassword, setShowConPassword] = useState(false);
    const handleClickShowConPassword = () => setShowConPassword(!showPassword);
    const handleMouseDownConPassword = () => setShowConPassword(!showPassword);

    const navigate = useNavigate();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
        },
        validationSchema: Yup.object({
            full_name: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!"),
        }),
        onSubmit: (values) => {
            console.log(values)
            navigate("/register/otp")
        }
    })

    return (
        <Box
            display="flex" flexDirection="column" alignItems="center"
        >
            <AppLogoCenter />
            <Typography style={{ fontSize: 30, marginTop: 10, fontFamily: "Quicksand" }}>
                    Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ width: 400 }}>
                    <FormLabel>Full Name</FormLabel>
                    <TextField
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
                        placeholder='Enter your name'
                        style={{ marginTop: 5 }}
                        size="small"
                        value={formik.values.full_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.full_name && formik.touched.full_name ?
                        <Typography color="red">{formik.errors.full_name}</Typography>
                        :
                        null
                    }
                    <FormLabel>Email</FormLabel>
                    <TextField
                        name="email"
                        id="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon/>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        placeholder='Enter your email'
                        style={{ marginTop: 5 }}
                        size="small"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ?
                        <Typography color="red">{formik.errors.email}</Typography>
                        :
                        null
                    }
                    <FormLabel>Phone</FormLabel>
                    <TextField
                        name="phone"
                        id="phone"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneAndroidIcon/>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        placeholder='Enter your phone'
                        style={{ marginTop: 5 }}
                        size="small"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.phone && formik.touched.phone ?
                        <Typography color="red">{formik.errors.phone}</Typography>
                        :
                        null
                    }
                    <FormLabel style={{ marginTop: 15 }}>Password</FormLabel>
                    <TextField
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
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
                            )
                        }}
                        variant="outlined"
                        placeholder='Enter your password'
                        style={{ marginTop: 5 }}
                        size="small"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ?
                        <Typography color="red">{formik.errors.password}</Typography>
                        :
                        null
                    }
                    <FormLabel style={{ marginTop: 15 }}>Confirm Password</FormLabel>
                    <TextField
                        name="confirm_password"
                        id="confirm_password"
                        type={showConPassword ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VerifiedUserIcon/>
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
                            )
                        }}
                        variant="outlined"
                        placeholder='Confirm your password'
                        style={{ marginTop: 5 }}
                        size="small"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.confirm_password && formik.touched.confirm_password ?
                        <Typography color="red">{formik.errors.confirm_password}</Typography>
                        :
                        null
                    }
                    <Button
                        type="submit"
                        variant='contained'
                        style={{ marginTop: 15, fontSize: 16 }}
                        onClick={formik.handleSubmit}
                    >
                        REGISTER
                    </Button>
                </FormControl>
            </form>
            <Box display="flex" style={{marginTop:10}}>
                <Typography>Already have an account? </Typography>
                <Link
                    style={{marginLeft:4}}
                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    Log in
                </Link>
            </Box>
        </Box>
    )
}
