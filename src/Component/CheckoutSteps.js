import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CheckoutSteps = (props) => {
    const { signin, shipping, payment, placeorder } = props;
    const steps = ['Sign in', 'Shipping', 'Payment', 'Place Order'];

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return signin;
            case 1:
                return shipping;
            case 2:
                return payment;
            case 3:
                return placeorder;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={props.activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box>
                <p>{getStepContent(props.activeStep)}</p>
            </Box>
        </Box>
    );
};

export default CheckoutSteps;
