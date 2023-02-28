import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import {Link, useNavigate} from "react-router-dom";

import AppLogoCenter from "../components/AppLogoCenter.jsx";

const ForgotPasswordEmail = () => {
    const navigate = useNavigate();

    return (
        <>
            <AppLogoCenter />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography style={{ fontSize: 30, marginTop: 10, fontFamily: "Quicksand" }}>
                    Forgot Password
                </Typography>
                <Box>
                    <Typography style={{ marginTop: 30, fontFamily: "Quicksand" }}>
                        We'll send an OTP code to:
                    </Typography>
                    <TextField
                        sx={ {width: 400 }}
                        label="example@gmail.com"
                        size="small"
                        inputProps={{style: {fontFamily: "Quicksand"}}}
                        InputLabelProps={{style: {fontFamily: "Quicksand"}}}
                    />
                </Box>
                <Box>
                    <Button
                        sx={ {width: 400 } }
                        style={{ marginTop: 10, fontFamily: "Quicksand" }}
                        variant="contained"
                        color="primary"
                        endIcon={<EastIcon />}
                        onClick={() => navigate("/forgotPassword/otp")}
                    >
                        Send OTP
                    </Button>
                </Box>
                <Box marginTop={10}>
                    <Link
                        to='/login'
                        style={{ color: "#000000", textDecoration: "underline", fontFamily: "Quicksand" }}
                    >
                        Back to login
                    </Link>
                </Box>
            </Box>
        </>
    );
}

export default ForgotPasswordEmail;
