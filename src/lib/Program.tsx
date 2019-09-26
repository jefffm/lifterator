import React, { Component, ReactNode } from 'react'
import Phase from './Phase'
import TrainingMaxesForm from './TrainingMaxesForm'
import { IExerciseWeightMapping, INTENSITY_SCHEME_DATA, REPETITIONS_SCHEME_DATA, ISetPrototype, Reps, SetType } from './Types'
import PlateCalculator, { IAvailablePlates } from '../util/PlateCalculator'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BeyondWarmupGen } from './WarmupGen'
import Collapse from 'react-bootstrap/Collapse'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

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
    firstSetLastFives: boolean
    firstSetLastAmrap: boolean
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
                [INTENSITY_SCHEME_DATA["3s"], REPETITIONS_SCHEME_DATA["5s pro"]],
                [INTENSITY_SCHEME_DATA["5s"], REPETITIONS_SCHEME_DATA["5s pro"]],
                [INTENSITY_SCHEME_DATA["1s"], REPETITIONS_SCHEME_DATA["5s pro"]]
            ],
            "unit": "lbs",
            "firstSetLastFives": true,
            "firstSetLastAmrap": false
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

        const firstSetLastFives = this.state.firstSetLastFives
        const firstSetLastAmrap = this.state.firstSetLastAmrap

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
                            "setType": SetType.AMRAP
                        }
                    }
                )
            }

            setProtosByPhase.push(setList)
        }

        const isRequiredDataSet = this.isRequiredDataSet()

        return <Container>
            <Row>
                <Col md={12} lg={7}>
                    <h2>{programName}</h2>
                </Col>
                <Col md={12} lg={5}>
                    <Accordion defaultActiveKey="0">

                        {/* Training Maxes configuration */}
                        <Card style={{ width: '35rem' }}>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Training Maxes
                        </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <TrainingMaxesForm
                                        trainingMaxes={trainingMaxes}
                                        handleChange={this.updateTrainingMaxes}
                                        unit={unit}
                                        validated={isRequiredDataSet}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* TODO: move this into a component */}
                        {/* Supplemental volume configuration */}
                        <Card style={{ width: '35rem' }}>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Supplemental Volume
                        </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <Form>
                                        <fieldset>
                                            <Form.Group as={Row}>
                                                <Form.Label column sm={6}>
                                                    First Set Last
                                                </Form.Label>
                                                <Col sm={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="5x5"
                                                        checked={firstSetLastFives}
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios1"
                                                        onChange={
                                                            (e: any) => {
                                                                this.setState({ firstSetLastFives: (e as any).currentTarget.checked })
                                                            }
                                                        }
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="AMRAP set"
                                                        checked={firstSetLastAmrap}
                                                        name="formHorizontalRadios"
                                                        id="formHorizontalRadios2"
                                                        onChange={
                                                            (e: any) => {
                                                                this.setState({ firstSetLastAmrap: (e as any).currentTarget.checked })
                                                            }
                                                        }
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                </Col>
            </Row>

            <Collapse in={!isRequiredDataSet}>
                <Jumbotron>
                    <h1>Lifterator</h1>
                    <p>Configure all required fields to build your program.</p>
                </Jumbotron>
            </Collapse>

            <Collapse in={isRequiredDataSet}>
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
            </Collapse>
        </Container>
    }
}