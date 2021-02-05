import { Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react'
import "./CheckOutSteps.scss"

function getSteps() {
    return ['Sign-in', 'Shipping', 'Payment', 'Place Order'];
}


function CheckOutSteps(props) {
    const steps = getSteps();
    const [activeStep] = React.useState(props.steps);

    return (
        <Grid container className="checkOutSteps">
            <Grid xs={12} item>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>

        </Grid>
    )
}

export default CheckOutSteps
