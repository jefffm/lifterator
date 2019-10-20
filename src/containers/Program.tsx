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
import { IMainExercisesState } from '../reducers/mainExercises';
import { IWeightSettings } from '../reducers/weightSettings';
import { Link } from 'react-router-dom'
import { ISetSettings, IWorkoutPrototype } from '../types';
import Cycle from '../lib/Cycle';
import { IntensityRepScheme } from '../reducers/PhaseIntensityRepSchemes';
import ExerciseProvider from '../lib/ExerciseProvider'
import WorkoutFactory from '../lib/WorkoutFactory'

interface ProgramProps {
    weightSettings: IWeightSettings
    mainExercises: IMainExercisesState
    setSettings: ISetSettings
    phaseIntensityRepSchemes: IntensityRepScheme[]
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

    render = (): ReactNode => {
        const plateCalculator = new PlateCalculator(
            {
                availablePlates: this.props.weightSettings.availablePlates,
                barWeight: this.props.weightSettings.barWeight
            }
        )
        // TODO: make warmupGen configurable
        const warmupGen = new BeyondWarmupGen(this.props.mainExercises)
        const exerciseProvider = new ExerciseProvider(Object.values(this.props.mainExercises))

        const cycle = new Cycle({
            unit: this.props.weightSettings.unit,
            phaseIntensityRepSchemes: this.props.phaseIntensityRepSchemes,
            setSettings: this.props.setSettings,
            exerciseProvider: exerciseProvider,
            warmupGen: warmupGen,
            plateCalculator: plateCalculator,
            workoutPrototypes: this.props.workoutDays
        })

        const workouts: WorkoutFactory[] = cycle.getWorkouts()

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="flex-start" alignItems="stretch" >
                <Box>
                    <h2>{"Program Name"}</h2>
                </Box>

                <Collapse in={!isRequiredDataSet}>
                    <div>
                        <h1>
                            Lifterator
                            </h1>
                        <p>Configure all required fields to build your program.</p>
                        <Button component={Link} to="/config">Configuration</Button>
                    </div>
                </Collapse>

                <Collapse in={isRequiredDataSet}>
                    <div>
                        <WorkoutStepper>
                            {workouts.map(workout => (
                                workout.getSetsasWorkoutSummary()
                            ))}
                        </WorkoutStepper>
                    </div>
                </Collapse>
            </Grid>
        </Container >
    }
}

const mapStateToProps = (state: AppState) => ({
    mainExercises: state.mainExercises,
    phaseIntensityRepSchemes: state.phaseIntensityRepSchemes,
    setSettings: state.setSettings,
    weightSettings: state.weightSettings,
    workoutDays: state.workoutDays,
})

export default connect(mapStateToProps)(Program)