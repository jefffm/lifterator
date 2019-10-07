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
import { Exercise } from '../lib/Exercises';
import { IMainExercisesState } from '../reducers/mainExercises';
import { IWeightSettings } from '../reducers/weightSettings';
import { ISetProtoConfig } from '../reducers/setProtoConfig';
import { Link } from 'react-router-dom'
import { ISetPrototype, IVolumeSettings, IWorkoutPrototype, SetType } from '../types';

interface ProgramProps {
    weightSettings: IWeightSettings
    mainExercises: IMainExercisesState
    volumeSettings: IVolumeSettings
    setProtoConfig: ISetProtoConfig
    dispatch: any
}

class Program extends Component<ProgramProps> {
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

        const setProtosByPhase: ISetPrototype[][] = createSets(this.props.setProtoConfig, this.props.volumeSettings)

        const mainExercises = this.props.mainExercises

        // TODO: move this to a reducer
        const workoutProtos: IWorkoutPrototype[] = [
            {
                // Day 1
                mainExercises: [
                    mainExercises['Squat'] as Exercise,
                    mainExercises['Bench Press'] as Exercise
                ],
                accessorySets: [
                    {
                        exercise: "Kroc Row",
                        sets: 1,
                        reps: { "num": 20, "setType": SetType.ACCESSORY },
                        weight: 70,
                    },
                    {
                        exercise: "DB OHP",
                        sets: 4,
                        reps: { "num": 7, "setType": SetType.ACCESSORY },
                        weight: 35,
                    },
                ]
            },
            // Day 2
            {
                mainExercises: [
                    mainExercises["Deadlift"] as Exercise,
                    mainExercises["Overhead Press"] as Exercise
                ],
                accessorySets: [
                    {
                        exercise: "Dips",
                        reps: { "num": 10, "setType": SetType.ACCESSORY },
                        sets: 4,
                        weight: 0,
                    },
                    {
                        exercise: "Face Pull",
                        reps: { "num": 15, "setType": SetType.ACCESSORY },
                        sets: 4,
                        weight: 32.3,
                    },
                ]
            }
        ]

        const createWorkoutsForPhase = function (
            phaseNum: number,
            phaseSetProtos: ISetPrototype[],
            phaseWorkouts: IWorkoutPrototype[],
        ) {
            return phaseWorkouts.map((workoutProto, i) => (
                <Workout
                    number={i + 1}
                    phase={phaseNum + 1}
                    unit={unit}

                    // Workout combines the main Exercise instances with the set/rep/intensity schemes to build sets
                    mainLifts={workoutProto.mainExercises}
                    setProtos={phaseSetProtos}

                    // Warmupgen builds warmup sets for *just* the main exercises
                    warmupGen={warmupGen}
                    plateCalculator={plateCalculator}

                    // These are just raw sets tacked onto the end. This should be improved.
                    accessorySets={workoutProto.accessorySets}
                />
            ))

        }
        // TODO: extract the default workout into a reducer
        const phases = setProtosByPhase.flatMap((phaseSetProtos, i) => (
            createWorkoutsForPhase(i, phaseSetProtos, workoutProtos)
        ))

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
        </Container>
    }
}

const mapStateToProps = (state: AppState) => ({
    mainExercises: state.mainExercises,
    setProtoConfig: state.setProtoConfig,
    volumeSettings: state.volumeSettings,
    weightSettings: state.weightSettings,
})

export default connect(mapStateToProps)(Program)