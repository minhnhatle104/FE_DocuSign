import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import AppLogoCenter from "../components/AppLogoCenter.jsx";
import {Box, TextField, Typography} from "@mui/material";
import EastIcon from "@mui/icons-material/East.js";
import {useNavigate} from "react-router-dom";

const ForgotPasswordOtp = () => {
    const navigate = useNavigate();
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const resendOtpClickedHandler = function() {
        setMinutes(4);
        setSeconds(59);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <>
            <AppLogoCenter />
            <Box display="flex" flexDirection="column" alignItems="center" fontFamily="Roboto">
                <Typography style={{ fontSize: 30, marginTop: 10 }}>
                    Forgot Password
                </Typography>
                <Box>
                    <Typography style={{ marginTop: 30 }}>
                        Enter the OTP code which sent to your provided email:
                    </Typography>
                    <TextField
                        sx={ {width: 400 }}
                        label="OTP code"
                        size="small"
                    />
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        {seconds > 0 || minutes > 0 ? (
                            <p>
                                Time Remaining:
                                <span style={{color: "#FFB800"}}>
                                    {minutes < 10 ? ` 0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                            </p>
                        ) : (
                            <Typography>Didn't receive code?</Typography>
                        )}
                        {seconds > 0 || minutes > 0 ? (
                            <Box color="#DFE3E8">
                                <Typography>Resend OTP?</Typography>
                            </Box>
                        ) : (
                            <Box color="#000000">
                                <Typography onClick={resendOtpClickedHandler}>Resend OTP?</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box>
                    <Button
                        sx={ {width: 400 } }
                        style={{ marginTop: 10 }}
                        variant="contained"
                        color="primary"
                        endIcon={<EastIcon />}
                        onClick={() => navigate("/forgotPassword/confirm")}
                    >
                        Verify OTP
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default ForgotPasswordOtp;
