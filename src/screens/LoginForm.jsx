import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import AppLogoCenter from '../components/AppLogoCenter';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
        }),
        onSubmit: (values) => {
            console.log(values)
            navigate("/")
        }
    })

    return (
        <Box
            display="flex" flexDirection="column" alignItems="center"
        >
            <AppLogoCenter />
            <Typography style={{ fontSize: 30, marginTop: 10, fontFamily: "Quicksand" }}>
                    Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ width: 400 }}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        name="email"
                        id="email"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
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
                    {formik.errors.email && formik.touched.email
                        ? <Typography color="red">{formik.errors.email}</Typography> : null}
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
                        null}
                </FormControl>
            </form>
            <Box sx={{width:400}} style={{marginTop:10}}>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate("/forgotPassword/email")
                    }}
                >
                    Forgot Password ?
                </Link>
            </Box>
            <FormControl sx={{ width: 400 }}>
                <Button
                    type="submit"
                    variant='contained'
                    style={{ marginTop: 15, fontSize: 16 }}
                    onClick={formik.handleSubmit}
                >
                    LOGIN
                </Button>
            </FormControl>
            <Box display="flex" style={{marginTop:10}}>
                <Typography>Don't have an account? </Typography>
                <Link
                    style={{marginLeft:4}}
                    component="button"
                    variant="body2"
                    onClick={() => {
                        navigate("/register")
                    }}
                >
                    Sign up
                </Link>
            </Box>
        </Box>
    )
}
