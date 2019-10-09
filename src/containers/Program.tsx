import React, { Component, ReactNode } from 'react'

import { isUndefined } from 'util'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Collapse from "@material-ui/core/Collapse"
import { Typography, Button } from '@material-ui/core'

import { AppState } from '../index';

import { PlateCalculator } from '../util/PlateCalculator'
import { BeyondWarmupGen } from '../lib/WarmupGen'
import WorkoutStepper from '../components/WorkoutStepper';
import createSets from '../lib/SetFactory';
import { IMainExercisesState } from '../reducers/mainExercises';
import { IWeightSettings } from '../reducers/weightSettings';
import { ISetProtoConfig } from '../reducers/setProtoConfig';
import { Link } from 'react-router-dom'
import { ISetPrototype, IVolumeSettings, IWorkoutPrototype } from '../types';
import { Exercise } from '../lib/Exercises';
import WorkoutFactory from '../lib/WorkoutFactory'
import PhaseFactory from '../lib/Phase';
import weightSettings from '../reducers/weightSettings';

interface ProgramProps {
    weightSettings: IWeightSettings
    mainExercises: IMainExercisesState
    volumeSettings: IVolumeSettings
    setProtoConfig: ISetProtoConfig
    workoutDays: IWorkoutPrototype[]
    dispatch: any
}

class Program extends Component<ProgramProps> {
    /**
     * Is all the data we need to show the program configured?
     */
    isRequiredDataSet(): boolean {
        const isAnyExerciseWithoutTm = Array.from(
            Object.values(this.props.mainExercises)
        ).some(x => isUndefined(x.trainingMax))

        return !isAnyExerciseWithoutTm
    }

    render(): ReactNode {
        const plateCalculator = new PlateCalculator(
            {
                availablePlates: this.props.weightSettings.availablePlates,
                barWeight: this.props.weightSettings.barWeight
            }
        )
        const warmupGen = new BeyondWarmupGen(this.props.mainExercises)

        const phaseFactory = new PhaseFactory({
            unit: this.props.weightSettings.unit,
            setProtoConfig: this.props.setProtoConfig,
            volumeSettings: this.props.volumeSettings,
            mainExercises: this.props.mainExercises,
            warmupGen: warmupGen,
            plateCalculator: plateCalculator,
            workoutPrototypes: this.props.workoutDays
        })

        const phases = phaseFactory.getPhases()

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="flex-start" alignItems="stretch" >
                <Box>
                    <h2>{"Program Name"}</h2>
                </Box>

                <Collapse in={!isRequiredDataSet}>
                    <div>
                        <Typography>
                            <h1>
                                Lifterator
                            </h1>
                        </Typography>
                        <p>Configure all required fields to build your program.</p>
                        <Button component={Link} to="/config">Configuration</Button>
                    </div>
                </Collapse>

                <Collapse in={isRequiredDataSet}>
                    <div>
                        <WorkoutStepper>
                            {phases}
                        </WorkoutStepper>
                    </div>
                </Collapse>
            </Grid>
        </Container >
    }
}

const mapStateToProps = (state: AppState) => ({
    mainExercises: state.mainExercises,
    setProtoConfig: state.setProtoConfig,
    volumeSettings: state.volumeSettings,
    weightSettings: state.weightSettings,
    workoutDays: state.workoutDays,
})

export default connect(mapStateToProps)(Program)