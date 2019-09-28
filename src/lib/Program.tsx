import React, { Component, ReactNode } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Collapse from "@material-ui/core/Collapse"

import * as types from './Types'
import { Phase } from './Phase'
import { TrainingMaxesForm } from './TrainingMaxesForm'
import { PlateCalculator, IAvailablePlates } from '../util/PlateCalculator'
import { BeyondWarmupGen } from './WarmupGen'
import { VolumeForm } from './VolumeForm'

type ProgramProps = {
    name: string
}

interface IProgramState {
    trainingMaxes: types.IExerciseWeightMapping
    availablePlates: IAvailablePlates
    barWeight: number
    setProtoConfig: [number[], types.Reps[]][]
    liftWarmupBaseWeights: types.IExerciseWeightMapping
    unit: string
    volumeSettings: types.IVolumeSettings
}

export class Program extends Component<ProgramProps, IProgramState> {
    constructor(props: ProgramProps) {
        super(props)

        this.state = {
            "trainingMaxes": {
                "Squat": undefined,
                "Bench Press": undefined,
                "Deadlift": undefined,
                "Overhead Press": undefined
            },
            "liftWarmupBaseWeights": {
                "Squat": 135,
                "Deadlift": 135,
                "Overhead Press": 95,
                "Bench Press": 95
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
            }
        }

        this.updateTrainingMaxes = this.updateTrainingMaxes.bind(this);
    }

    updateTrainingMaxes(event: React.FormEvent<HTMLInputElement>, key: string) {
        const value = event.currentTarget.valueAsNumber
        // eslint-disable-next-line
        this.setState(state => (state.trainingMaxes[key] = value, state))
    }

    isRequiredDataSet(): boolean {
        for (const [k, v] of Object.entries(this.state.trainingMaxes)) {
            if (v === undefined) {
                return false
            }
        }

        return true
    }

    render(): ReactNode {
        const programName = this.props.name
        var trainingMaxes = this.state.trainingMaxes
        const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })
        const setProtoConfig = this.state.setProtoConfig
        const warmupGen = new BeyondWarmupGen(this.state.liftWarmupBaseWeights)
        const unit = this.state.unit

        const firstSetLastFives = this.state.volumeSettings.firstSetLastFives
        const firstSetLastAmrap = this.state.volumeSettings.firstSetLastAmrap

        var setProtosByPhase: types.ISetPrototype[][] = []
        for (const [intensitySets, repSets] of setProtoConfig) {
            var setList: types.ISetPrototype[] = []
            for (const [setNum, intensityPct] of intensitySets.entries()) {
                setList.push(
                    {
                        "intensityPct": intensityPct as number,
                        "reps": repSets[setNum] as types.Reps
                    }
                )
            }

            // Configure supplemental volume sets
            const firstSetIntensityPct = intensitySets[0]
            const firstSetReps = repSets[0]

            if (firstSetLastFives) {
                // Add 5x5 at first set's intensity
                for (var i = 0; i < 5; i++) {
                    setList.push({
                        "intensityPct": firstSetIntensityPct as number,
                        "reps": firstSetReps as types.Reps
                    })
                }
            }

            if (firstSetLastAmrap) {
                setList.push(
                    {
                        "intensityPct": firstSetIntensityPct as number,
                        "reps": {
                            "num": (firstSetReps as types.Reps).num,
                            "setType": types.SetType.AMRAP
                        }
                    }
                )
            }

            setProtosByPhase.push(setList)
        }

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Grid container direction="column" justify="space-evenly" alignItems="stretch" >
                <Box>
                    <h2>{programName}</h2>
                </Box>

                <Box>
                    {/* Training Maxes configuration */}
                    <Paper>
                        <Typography>
                            Training Maxes
                        </Typography>
                        <TrainingMaxesForm
                            trainingMaxes={trainingMaxes}
                            handleChange={this.updateTrainingMaxes}
                            unit={unit}
                            validated={isRequiredDataSet}
                        />
                    </Paper>
                </Box>

                <Box>

                    {/* Supplemental volume configuration */}
                    <Paper>
                        <VolumeForm
                            volumeSettings={this.state.volumeSettings}
                            onChange={
                                (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.setState(
                                        {
                                            volumeSettings: {
                                                ...this.state.volumeSettings, [name]: event.currentTarget.checked
                                            }
                                        }
                                    );
                                }
                            } />
                    </Paper>
                </Box >

                <Collapse in={!isRequiredDataSet}>
                    <Paper>
                        <h1>Lifterator</h1>
                        <p>Configure all required fields to build your program.</p>
                    </Paper>
                </Collapse>

                <Collapse in={isRequiredDataSet}>
                    <Box>
                        {
                            setProtosByPhase.map(function (setProtos: types.ISetPrototype[], i) {
                                return <Phase
                                    number={i}
                                    trainingMaxes={trainingMaxes}
                                    plateCalculator={plateCalculator}
                                    warmupGen={warmupGen}
                                    setProtos={setProtos}
                                    unit={unit}
                                />
                            })
                        }
                    </Box>
                </Collapse>
            </Grid >
        </Container >
    }
}