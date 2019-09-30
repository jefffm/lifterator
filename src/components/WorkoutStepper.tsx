import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

interface WorkoutStepperProps {
    elems: () => JSX.Element[]
}

export default function WorkoutStepper(props: WorkoutStepperProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const elems = props.elems()
    const numSteps = elems.length

    return (
        <div>
            <Paper>

                <MobileStepper
                    variant="dots"
                    steps={numSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === numSteps - 1}>
                            Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
        </Button>
                    }
                />
                {elems[activeStep]}
            </Paper>
        </div>
    );
}