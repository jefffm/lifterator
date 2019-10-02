import React, { Component, ReactNode } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Collapse from "@material-ui/core/Collapse"
import { Typography } from '@material-ui/core'

import * as types from './Types'
import { PlateCalculator, IAvailablePlates } from '../util/PlateCalculator'
import { BeyondWarmupGen } from './WarmupGen'
import ConfigurationPanel from '../components/ConfigurationPanel'
import WorkoutStepper from '../components/WorkoutStepper';
import Workout from './Workout'
import createSets from './SetFactory';
import NameExerciseMapper, { Exercise } from './Exercises';
import { isUndefined } from 'util'
import ExerciseProvider from './Exercises'
import { ExerciseWithHandler } from './Exercises';

type ProgramProps = {
    name: string
}

interface IProgramState {
    [key: string]: any
    unit: string
    barWeight: number
    availablePlates: IAvailablePlates
    setProtoConfig: [number[], types.Reps[]][]
    volumeSettings: types.IVolumeSettings
    mainExercises: Exercise[]
}

export class Program extends Component<ProgramProps, IProgramState> {
    constructor(props: ProgramProps) {
        super(props)

        this.state = {
            "unit": "lbs",
            "barWeight": 45,
            "availablePlates": {
                45: 4,
                25: 3,
                10: 2,
                5: 1,
                2.5: 1
            },
            "setProtoConfig": [
                [types.INTENSITY_SCHEME_DATA["3s"], types.REPETITIONS_SCHEME_DATA["5s pro"]],
                [types.INTENSITY_SCHEME_DATA["5s"], types.REPETITIONS_SCHEME_DATA["5s pro"]],
                [types.INTENSITY_SCHEME_DATA["1s"], types.REPETITIONS_SCHEME_DATA["5s pro"]]
            ],
            "volumeSettings": {
                "firstSetLastFives": true,
                "firstSetLastAmrap": false
            },
            "mainExercises": [
                {
                    name: "Bench Press",
                    shortname: "BP",
                    aliases: ["bps", "bench", "horizontal press"],
                    trainingMax: undefined,
                    warmupBaseWeight: 95
                },
                {
                    name: "Deadlift",
                    shortname: "DL",
                    aliases: ["dead", "deads", "dls"],
                    trainingMax: undefined,
                    warmupBaseWeight: 135
                },
                {
                    name: "Overhead Press",
                    shortname: "OHP",
                    aliases: ["press", "military press"],
                    trainingMax: undefined,
                    warmupBaseWeight: 95
                },
                {
                    name: "Squat",
                    shortname: "SQ",
                    aliases: ["back squat"],
                    trainingMax: undefined,
                    warmupBaseWeight: 135
                }
            ]

        }
    }

    isRequiredDataSet(): boolean {
        const isAnyExerciseWithoutTm = this.state.mainExercises.some(x => isUndefined(x.trainingMax))

        return isAnyExerciseWithoutTm
    }

    render(): ReactNode {
        const programName = this.props.name
        const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })
        const setProtoConfig = this.state.setProtoConfig
        const warmupGen = new BeyondWarmupGen(this.state.liftWarmupBaseWeights)
        const unit = this.state.unit

        const programInstance = this
        const changeHandlerFactory = (key: string) => (subkey: string) => (event: React.ChangeEvent<any>) => {
            programInstance.setState(
                {
                    [key]: {
                        ...programInstance.state[key],
                        // TODO: support values/checkboxes better
                        [subkey]: event.currentTarget.value || event.currentTarget.checked
                    }
                }
            );
        }

        const exerciseChangeHandlerFactory = (index: number, exercise: Exercise) => (event: React.ChangeEvent<any>) => {
            var newExercises = programInstance.state.mainExercises
            newExercises.splice(index, 1, exercise)
            programInstance.setState({ mainExercises: newExercises })
        }

        const exerciseProvider = new ExerciseProvider(this.state.mainExercises, exerciseChangeHandlerFactory)

        const volumeSettings = this.state.volumeSettings

        const setProtosByPhase = createSets(setProtoConfig, volumeSettings)
        const phases = setProtosByPhase.flatMap(function (setProtos: types.ISetPrototype[], i) {
            return [
                <Workout
                    number={1}
                    phase={i}
                    mainLifts={
                        [
                            exerciseProvider.get("Squat"),
                            exerciseProvider.get("Bench Press")
                        ].filter(x => !isUndefined(x)).map(x => (x as ExerciseWithHandler).exercise)
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
                            exerciseProvider.get("Deadlift"),
                            exerciseProvider.get("Overhead Press")
                        ].filter(x => !isUndefined(x)).map(x => (x as ExerciseWithHandler).exercise)
                    }
                    plateCalculator={plateCalculator}
                    warmupGen={warmupGen}
                    setProtos={setProtos}
                    unit={unit}
                    accessorySets={[]}
                />
            ]
        })

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="space-evenly" alignItems="stretch" >
                <Box>
                    <h2>{programName}</h2>
                </Box>

                {/*}
                <ConfigurationPanel
                    unit={unit}
                    volumeSettings={volumeSettings}
                    onChange={changeHandlerFactory}
                    exerciseProvider={exerciseProvider}
                />
    {*/}

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