import React, { Component, ReactNode } from 'react'
import Phase from './Phase'
import TrainingMaxesForm from './TrainingMaxesForm'
import { IExerciseWeightMapping, INTENSITY_SCHEME_DATA, REPETITIONS_SCHEME_DATA, ISetPrototype, Reps } from './Types'
import PlateCalculator, { IAvailablePlates } from '../util/PlateCalculator'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BeyondWarmupGen } from './WarmupGen'

type ProgramProps = {
    name: string
}

interface IProgramState {
    trainingMaxes: IExerciseWeightMapping
    availablePlates: IAvailablePlates
    barWeight: number
    setProtoConfig: [number[], Reps[]][]
    liftWarmupBaseWeights: IExerciseWeightMapping
    unit: string
}

export class Program extends Component<ProgramProps, IProgramState> {
    constructor(props: ProgramProps) {
        super(props)

        this.state = {
            "trainingMaxes": {
                "Squat": 150,
                "Bench Press": 155,
                "Deadlift": 190,
                "Overhead Press": 105
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
                [INTENSITY_SCHEME_DATA["3s"], REPETITIONS_SCHEME_DATA["5s pro"]],
                [INTENSITY_SCHEME_DATA["5s"], REPETITIONS_SCHEME_DATA["5s pro"]],
                [INTENSITY_SCHEME_DATA["1s"], REPETITIONS_SCHEME_DATA["5s pro"]]
            ],
            "unit": "lbs"
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>, key: string) {
        const value = event.currentTarget.valueAsNumber
        // eslint-disable-next-line
        this.setState(state => (state.trainingMaxes[key] = value, state))
    }

    render(): ReactNode {
        const programName = this.props.name
        var trainingMaxes = this.state.trainingMaxes
        const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })
        const setProtoConfig = this.state.setProtoConfig
        const warmupGen = new BeyondWarmupGen(this.state.liftWarmupBaseWeights)
        const unit = this.state.unit

        // TODO: Add FSL/supplemental volume configuration to the program form
        const firstSetLast = true
        const firstSetLastFives = true
        const firstSetLastAmrap = false

        var setProtosByPhase: ISetPrototype[][] = []
        for (const [intensitySets, repSets] of setProtoConfig) {
            var setList: ISetPrototype[] = []
            for (const [setNum, intensityPct] of intensitySets.entries()) {
                setList.push(
                    {
                        "intensityPct": intensityPct as number,
                        "reps": repSets[setNum] as Reps
                    }
                )
            }

            // Configure supplemental volume sets
            if (firstSetLast) {
                const firstSetIntensityPct = intensitySets[0]
                const firstSetReps = repSets[0]

                if (firstSetLastFives) {
                    // Add 5x5 at first set's intensity
                    for (var i = 0; i < 5; i++) {
                        setList.push({
                            "intensityPct": firstSetIntensityPct as number,
                            "reps": firstSetReps as Reps
                        })
                    }
                }

                if (firstSetLastAmrap) {
                    setList.push(
                        {
                            "intensityPct": firstSetIntensityPct as number,
                            "reps": {
                                "num": (firstSetReps as Reps).num,
                                "setType": "amrap"
                            }
                        }
                    )
                }
            }

            setProtosByPhase.push(setList)
        }

        // TODO: Move TrainingMaxesForm to a top react-doc: https://github.com/alexkuz/react-dock
        return <Container>
            <Row>
                <Col md={12} lg={7}>
                    <h2>{programName}</h2>
                </Col>
                <Col md={12} lg={5}>
                    <h3>Training Maxes</h3>
                    <TrainingMaxesForm
                        trainingMaxes={trainingMaxes}
                        handleChange={this.handleChange}
                        unit={unit} />
                </Col>
            </Row>

            <Row noGutters>
                {
                    setProtosByPhase.map(function (setProtos: ISetPrototype[], i) {
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
            </Row>
        </Container>
    }
}