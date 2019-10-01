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
import NameExerciseMapper, { Exercise, IExerciseWeightMapping } from './Exercises';

type ProgramProps = {
    name: string
}

interface IProgramState {
    [key: string]: any
    trainingMaxes: IExerciseWeightMapping
    availablePlates: IAvailablePlates
    barWeight: number
    setProtoConfig: [number[], types.Reps[]][]
    liftWarmupBaseWeights: IExerciseWeightMapping
    unit: string
    volumeSettings: types.IVolumeSettings
    mainExercises: Exercise[]
}

export class Program extends Component<ProgramProps, IProgramState> {
    constructor(props: ProgramProps) {
        super(props)

        this.state = {
            // "trainingMaxes": {
            //     "Squat": undefined,
            //     "Bench Press": undefined,
            //     "Deadlift": undefined,
            //     "Overhead Press": undefined
            // },
            "trainingMaxes": {
                SQUAT: 155,
                BENCH_PRESS: 155,
                DEADLIFT: 200,
                OVERHEAD_PRESS: 105
            },
            "liftWarmupBaseWeights": {
                SQUAT: 135,
                DEADLIFT: 135,
                OVERHEAD_PRESS: 95,
                BENCH_PRESS: 95
            },
            "availablePlates": {
                45: 4,
                25: 3,
                10: 2,
                5: 1,
                2.5: 1
            },
            "barWeight": 45,
            "setProtoConfig": [
                [types.INTENSITY_SCHEME_DATA["3s"], types.REPETITIONS_SCHEME_DATA["5s pro"]],
                [types.INTENSITY_SCHEME_DATA["5s"], types.REPETITIONS_SCHEME_DATA["5s pro"]],
                [types.INTENSITY_SCHEME_DATA["1s"], types.REPETITIONS_SCHEME_DATA["5s pro"]]
            ],
            "unit": "lbs",
            "volumeSettings": {
                "firstSetLastFives": true,
                "firstSetLastAmrap": false
            },
            "mainExercises": [
                {
                    name: "Bench Press",
                    shortname: "BP",
                    aliases: ["bps", "bench", "horizontal press"]
                },
                {
                    name: "Deadlift",
                    shortname: "DL",
                    aliases: ["dead", "deads", "dls"]
                },
                {
                    name: "Overhead Press",
                    shortname: "OHP",
                    aliases: ["press", "military press"]
                },
                {
                    name: "Squat",
                    shortname: "SQ",
                    aliases: ["back squat"]
                }
            ]

        }
    }

    isRequiredDataSet(): boolean {
        for (const [_, v] of Object.entries(this.state.trainingMaxes)) {
            if (v === undefined) {
                return false
            }
        }

        return true
    }

    render(): ReactNode {
        const programName = this.props.name
        const trainingMaxes = this.state.trainingMaxes
        const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })
        const setProtoConfig = this.state.setProtoConfig
        const warmupGen = new BeyondWarmupGen(this.state.liftWarmupBaseWeights)
        const unit = this.state.unit

        const getExerciseFromName = NameExerciseMapper(this.state.mainExercises)

        const volumeSettings = this.state.volumeSettings

        const setProtosByPhase = createSets(setProtoConfig, volumeSettings)
        const phases = setProtosByPhase.flatMap(function (setProtos: types.ISetPrototype[], i) {
            return [
                <Workout
                    number={1}
                    phase={i}
                    mainLifts={[getExerciseFromName("Squat"), getExerciseFromName("Bench Press")]}
                    trainingMaxes={trainingMaxes}
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
                    mainLifts={[getExerciseFromName("Deadlift"), getExerciseFromName("Overhead Press")]}
                    trainingMaxes={trainingMaxes}
                    plateCalculator={plateCalculator}
                    warmupGen={warmupGen}
                    setProtos={setProtos}
                    unit={unit}
                    accessorySets={[]}
                />
            ]
        })

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

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="space-evenly" alignItems="stretch" >
                <Box>
                    <h2>{programName}</h2>
                </Box>

                <ConfigurationPanel
                    unit={unit}
                    volumeSettings={volumeSettings}
                    trainingMaxes={trainingMaxes}
                    onChange={changeHandlerFactory}
                />

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
        </Container>
    }
}