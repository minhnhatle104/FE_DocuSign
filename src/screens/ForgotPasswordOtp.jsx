import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import AppLogoCenter from '../components/AppLogoCenter.jsx'
import { Box, TextField, Typography } from '@mui/material'
import EastIcon from '@mui/icons-material/East.js'
import { useNavigate } from 'react-router-dom'
import { MuiOtpInput } from 'mui-one-time-password-input'

const ForgotPasswordOtp = () => {
  const navigate = useNavigate()
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [value, setValue] = useState('')
  const [isBackSpace, setIsBackSpace] = useState(false)

  const resendOtpClickedHandler = function () {
    setMinutes(4)
    setSeconds(59)
  }

  const handleKeyDown = (event) => {
    // console.log('User pressed: ', event.key);
    // console.log(message);
    if (event.key === 'Backspace') {
      // 👇️ your logic here
      // console.log('Backspace key pressed ✅');
      setIsBackSpace(true)
    } else {
      setIsBackSpace(false)
    }
  }
  const handleChange = (newValue) => {
    setValue(newValue)
  }
  const matchIsNumeric = (text, isBackSpace) => {
    const isNumber = typeof text === 'number'
    const isString = typeof text === 'string' || text instanceof String
    return (
      ((isNumber || (isString && text !== '')) && !isNaN(Number(text))) ||
      isBackSpace
    )
  }
  const validateChar = (value, index) => {
    return matchIsNumeric(value, isBackSpace)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  return (
    <>
      <AppLogoCenter />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        fontFamily="Roboto"
      >
        <Typography
          style={{ fontSize: 30, marginTop: 10, fontFamily: 'Quicksand' }}
        >
          FORGOT PASSWORD
        </Typography>
        <Box>
          <Typography
            style={{ marginTop: 20, marginBottom: 10, fontFamily: 'Quicksand' }}
          >
            Enter the OTP code which sent to your provided email:
          </Typography>
          <MuiOtpInput
            length={6}
            sx={{ width: 400 }}
            TextFieldsProps={{ label: '-' }}
            title="Enter OTP Code"
            onKeyDown={handleKeyDown}
            inputStyle={{ fontFamily: 'Quicksand' }}
            value={value}
            onChange={handleChange}
            validateChar={validateChar}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {seconds > 0 || minutes > 0 ? (
              <p style={{ fontFamily: 'Quicksand' }}>
                Time Remaining:
                <span style={{ color: '#b84d0f', fontWeight: 'bold' }}>
                  {minutes < 10 ? ` 0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </p>
            ) : (
              <Typography
                style={{
                  fontFamily: 'Quicksand',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}
              >
                Didn't receive code?
              </Typography>
            )}
            {seconds > 0 || minutes > 0 ? (
              <Box color="#61605f">
                <Typography
                  style={{ fontFamily: 'Quicksand', fontWeight: 'bold' }}
                >
                  Resend OTP?
                </Typography>
              </Box>
            ) : (
              <Box color="#000000">
                <Typography
                  style={{ fontFamily: 'Quicksand' }}
                  onClick={resendOtpClickedHandler}
                >
                  Resend OTP?
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          <Button
            sx={{ width: 400 }}
            style={{
              marginTop: 10,
              fontFamily: 'Quicksand',
              fontWeight: 'bold',
            }}
            variant="contained"
            color="primary"
            endIcon={<EastIcon />}
            onClick={() => navigate('/forgotPassword/confirm')}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ForgotPasswordOtp
