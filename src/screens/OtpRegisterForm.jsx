import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EastIcon from "@mui/icons-material/East.js";
import AppLogoCenter from '../components/AppLogoCenter'
import { MuiOtpInput } from 'mui-one-time-password-input'

export default function OtpRegisterForm() {
    const navigate = useNavigate();
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isBackSpace,setIsBackSpace] = useState(false);

    const resendOtpClickedHandler = function () {
        setMinutes(4);
        setSeconds(59);
    }

    const [value, setValue] = useState('')

    const handleChange = (newValue) => {
        setValue(newValue)
    }

    const matchIsNumeric = (text,isBackSpace) => {
        const isNumber = typeof text === 'number'
        const isString = typeof text === 'string' || text instanceof String
        return (isNumber || (isString && text !== '')) && !isNaN(Number(text)) || (isBackSpace)
    }

    const validateChar = (value, index) => {
        return matchIsNumeric(value,isBackSpace)
    }

    const handleKeyDown = event => {
        // console.log('User pressed: ', event.key);
        // console.log(message);
        if (event.key === 'Backspace') {
            // 👇️ your logic here
            // console.log('Backspace key pressed ✅');
            setIsBackSpace(true)  
        }else{
            setIsBackSpace(false)
        }
    };

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
        <Box display="flex" flexDirection="column" alignItems="center">
            <AppLogoCenter />
            <Typography style={{ fontSize: 30, marginTop: 10, fontFamily: "Quicksand" }}>
                Verified Account
            </Typography>
            <Box>
                <Typography style={{ marginTop: 20, marginBottom: 10, fontFamily: "Quicksand" }}>
                    Enter the OTP code which sent to your provided email:
                </Typography>
                <MuiOtpInput length={6} sx={{ width: 400 }}
                    style={{ fontFamily: "Quicksand" }}
                    onKeyDown={handleKeyDown}
                    value={value} onChange={handleChange} validateChar={validateChar} />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {seconds > 0 || minutes > 0 ? (
                        <p style={{ fontFamily: "Quicksand" }}>
                            Time Remaining:
                            <span style={{ color: "#FFB800" }}>
                                {minutes < 10 ? ` 0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                        </p>
                    ) : (
                        <Typography>Didn't receive code?</Typography>
                    )}
                    {seconds > 0 || minutes > 0 ? (
                        <Box color="gray">
                            <Typography style={{ fontFamily: "Quicksand" }}>Resend OTP?</Typography>
                        </Box>
                    ) : (
                        <Box color="#000000">
                            <Typography style={{ fontFamily: "Quicksand" }} onClick={resendOtpClickedHandler}>Resend OTP?</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box>
                <Button
                    sx={{ width: 400 }}
                    style={{ marginTop: 10, fontFamily: "Quicksand" }}
                    variant="contained"
                    color="primary"
                    endIcon={<EastIcon />}
                    onClick={() => navigate("/login")}
                >
                    Verify OTP
                </Button>
            </Box>
        </Box>
    )
}
