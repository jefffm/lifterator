import React, { Component, ReactNode } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Collapse from "@material-ui/core/Collapse"
import { Typography } from '@material-ui/core'

import * as types from '../types'
import { PlateCalculator, IAvailablePlates } from '../util/PlateCalculator'
import { BeyondWarmupGen } from './WarmupGen'
import ConfigurationPanel from '../components/ConfigurationPanel'
import WorkoutStepper from '../components/WorkoutStepper';
import Workout from './Workout'
import createSets from './SetFactory';
import NameExerciseMapper, { Exercise } from './Exercises';
import { isUndefined } from 'util'
import ExerciseProvider from './Exercises'
import mainExercises from '../reducers/mainExercises';

type ProgramProps = {
    name: string
}

interface IProgramState {
    [key: string]: any
    unit: string
    barWeight: number
    availablePlates: IAvailablePlates
    volumeSettings: types.IVolumeSettings
    mainExercises: Exercise[]
}

export class Program extends Component<ProgramProps, IProgramState> {
    isRequiredDataSet(): boolean {
        return true
        const isAnyExerciseWithoutTm = this.state.mainExercises.some(x => isUndefined(x.trainingMax))

        return isAnyExerciseWithoutTm
    }

    render(): ReactNode {
        const programName = this.props.name
        //const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })
        //const setProtoConfig = this.state.setProtoConfig
        //const warmupGen = new BeyondWarmupGen(this.state.liftWarmupBaseWeights)
        //const unit = this.state.unit

        // TODO START-SETBUILDER-CLASS
        //const volumeSettings = this.state.volumeSettings
        //const setProtosByPhase = createSets(setProtoConfig, volumeSettings)

        // TODO ... can the ExerciseProvider live *in* the reducer?
        //const exerciseProvider = new ExerciseProvider(mainExercises)

        const phases: JSX.Element[] = []
        /*
        // TODO: extract the default workout into a reducer
        const phases = setProtosByPhase.flatMap(function (setProtos: types.ISetPrototype[], i) {
            return [
                <Workout
                    number={1}
                    phase={i}
                    mainLifts={["Squat", "Bench Press"]}
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
                    mainLifts={["Deadlift", "Overhead Press"]}
                    plateCalculator={plateCalculator}
                    warmupGen={warmupGen}
                    setProtos={setProtos}
                    unit={unit}
                    accessorySets={[]}
                />
            ]
        })
        */
        // TODO END-SETBUILDER-CLASS

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="space-evenly" alignItems="stretch" >
                <Box>
                    <h2>{programName}</h2>
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