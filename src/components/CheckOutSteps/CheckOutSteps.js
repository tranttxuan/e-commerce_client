import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react'
import "./CheckOutSteps.scss"


function getSteps() {
    return ['Sign-in', 'Shipping', 'Payment', 'Place Order'];
}


function CheckOutSteps(props) {
    const steps = getSteps();
    const [activeStep, setActiveStep] = React.useState(props.steps);

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default CheckOutSteps
