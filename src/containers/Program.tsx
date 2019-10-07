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
import Workout from '../components/Workout'
import createSets from '../lib/SetFactory';
import { IMainExercisesState } from '../reducers/mainExercises';
import { IWeightSettings } from '../reducers/weightSettings';
import { ISetProtoConfig } from '../reducers/setProtoConfig';
import { Link } from 'react-router-dom'
import { ISetPrototype, IVolumeSettings, IWorkoutPrototype } from '../types';
import { Exercise } from '../lib/Exercises';
import WorkoutFactory from '../lib/WorkoutFactory'

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
        const unit = this.props.weightSettings.unit

        const mainExercises = this.props.mainExercises
        const workoutDays = this.props.workoutDays

        // TODO: move this logic into a "PHASE" component, separate app and presentation logic - START
        const setProtosByPhase: ISetPrototype[][] = createSets(this.props.setProtoConfig, this.props.volumeSettings)

        const createWorkoutsForPhase = function (
            phaseNum: number,
            phaseSetProtos: ISetPrototype[],
            phaseWorkouts: IWorkoutPrototype[],
        ) {
            return phaseWorkouts.map(
                (workoutProto, i) => {
                    const exerciseInstances: Exercise[] = workoutProto.exerciseNames.map(
                        name => (mainExercises[name] as Exercise)
                    )

                    // TODO: move application logic out of the "Workout"
                    const workoutFactory = new WorkoutFactory(
                        {
                            number: i + 1,
                            phase: phaseNum,
                            unit: unit,

                            // Workout combines the main Exercise instances with the set/rep/intensity schemes to build sets
                            mainLifts: exerciseInstances,
                            setProtos: phaseSetProtos,

                            // Warmupgen builds warmup sets for *just* the main exercises
                            warmupGen: warmupGen,
                            plateCalculator: plateCalculator,

                            // These are just raw sets tacked onto the end. This should be improved.
                            accessorySets: workoutProto.accessorySets,
                        }
                    )

                    const sets = workoutFactory.getSets()

                    return <Workout
                        phase={phaseNum}
                        number={i + 1}
                        setGroupProps={sets} />
                }
            )

        }

        const phases = setProtosByPhase.flatMap((phaseSetProtos, i) => (
            createWorkoutsForPhase(i, phaseSetProtos, workoutDays)
        ))
        // TODO: move this logic into a "PHASE" component, separate app and presentation logic - END

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