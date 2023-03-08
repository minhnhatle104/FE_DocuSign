import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
    {
        label: 'Upload your document (.pdf file).',
    },
    {
        label: "Recipients information.",
    },
    {
        label: 'Add your signature.',
    },
    {
        label: 'Review and Forward.',
    }
];

export default function StepInit(props) {
    return (
        <Box sx={{ maxWidth: "100%", marginTop: "20px"}}>
            <Stepper activeStep={props.step} alternativeLabel>
                {steps.map((item) => (
                    <Step style={{fontFamily: "Quicksand"}} key={item.label}>
                        <StepLabel style={{fontFamily: "Quicksand"}}>{item.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}