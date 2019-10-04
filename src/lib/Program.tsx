import React, { Component, ReactNode } from 'react'

import { isUndefined } from 'util'
import { connect } from 'react-redux'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Collapse from "@material-ui/core/Collapse"
import { Typography } from '@material-ui/core'

import { AppState } from '../index';

import * as types from '../types'
import { PlateCalculator } from '../util/PlateCalculator'
import { BeyondWarmupGen } from './WarmupGen'
import ConfigurationPanel from '../components/ConfigurationPanel'
import WorkoutStepper from '../components/WorkoutStepper';
import Workout from './Workout'
import createSets from './SetFactory';
import { Exercise } from './Exercises';
import { IMainExercisesState } from '../reducers/mainExercises';
import { IWeightSettings } from '../reducers/weightSettings';
import { ISetProtoConfig } from '../reducers/setProtoConfig';

interface ProgramProps {
    weightSettings: IWeightSettings
    mainExercises: IMainExercisesState
    volumeSettings: types.IVolumeSettings
    setProtoConfig: ISetProtoConfig
    dispatch: any
}

class Program extends Component<ProgramProps> {
    isRequiredDataSet(): boolean {
        const isAnyExerciseWithoutTm = Array.from(
            this.props.mainExercises.values()
        ).some(x => isUndefined(x.trainingMax))

        return isAnyExerciseWithoutTm
    }

    render(): ReactNode {
        const plateCalculator = new PlateCalculator(
            {
                availablePlates: this.props.weightSettings.availablePlates,
                barWeight: this.props.weightSettings.barWeight
            })
        const warmupGen = new BeyondWarmupGen(this.props.mainExercises)
        const unit = this.props.weightSettings.unit

        // TODO START-SETBUILDER-CLASS
        const setProtosByPhase = createSets(this.props.setProtoConfig, this.props.volumeSettings)

        const mainExercises = this.props.mainExercises

        // TODO: extract the default workout into a reducer
        const phases = setProtosByPhase.flatMap(function (setProtos: types.ISetPrototype[], i) {
            return [
                <Workout
                    number={1}
                    phase={i}
                    mainLifts={
                        [
                            mainExercises.get("Squat") as Exercise,
                            mainExercises.get("Bench Press") as Exercise
                        ]
                    }
                    plateCalculator={plateCalculator}
                    warmupGen={warmupGen}
                    setProtos={setProtos}
                    unit={unit}
                    accessorySets={[
                        {
                            exercise: "DB Row",
                            reps: { "num": 20, "setType": types.SetType.ACCESSORY },
                            weight: 65,
                            plates: []
                        },
                        {
                            exercise: "KB Swing",
                            reps: { "num": 20, "setType": types.SetType.ACCESSORY },
                            weight: 53,
                            plates: []
                        },
                    ]}
                />,

                <Workout
                    number={2}
                    phase={i}
                    mainLifts={
                        [
                            mainExercises.get("Deadlift") as Exercise,
                            mainExercises.get("Overhead Press") as Exercise
                        ]
                    }
                    plateCalculator={plateCalculator}
                    warmupGen={warmupGen}
                    setProtos={setProtos}
                    unit={unit}
                    accessorySets={[]}
                />
            ]
        })
        // TODO END-SETBUILDER-CLASS

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="flex-start" alignItems="stretch" >
                <Box>
                    <h2>{"Program Name"}</h2>
                </Box>

                <ConfigurationPanel />

                <Collapse in={!isRequiredDataSet}>
                    <Paper>
                        <Typography>
                            <h1>
                                Lifterator
                            </h1>
                        </Typography>
                        <p>Configure all required fields to build your program.</p>
                    </Paper>
                </Collapse>

                <Collapse in={isRequiredDataSet}>
                    <Box>
                        {<WorkoutStepper elems={() => phases} />}
                    </Box>
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
})

export default connect(mapStateToProps)(Program)