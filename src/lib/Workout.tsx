import React, { Component, ReactNode } from 'react'
import SetGroup from './SetGroup';
import { round5 } from '../util/Math';
import PlateCalculator from '../util/PlateCalculator';
import { ISetPrototype } from './Types';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import { BeyondWarmupGen } from './WarmupGen';

type WorkoutProps = {
    number: number
    phase: number
    mainLifts: string[]
    trainingMaxes: object
    plateCalculator: PlateCalculator
    setProtos: ISetPrototype[]
};

export class Workout extends Component<WorkoutProps> {
    render(): ReactNode {
        const number = this.props.number
        const phase = this.props.phase
        const setProtos = this.props.setProtos
        const mainLifts = this.props.mainLifts
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator

        const warmupGen = new BeyondWarmupGen()

        return <Col md={12} lg={6}>
            <Card>
                <Card.Header>
                    Phase {phase + 1}: Workout {number}
                </Card.Header>
                <Card.Body>
                    <Row noGutters>
                        {
                            mainLifts.map(
                                function (lift) {
                                    const exerciseTrainingMax = (trainingMaxes as any)[lift]
                                    const sets = setProtos.map(
                                        function (setProto: ISetPrototype) {
                                            const setReps = setProto.reps
                                            const setWeight = round5(exerciseTrainingMax * setProto.intensityPct)
                                            return {
                                                "exercise": lift,
                                                "reps": setReps.num,
                                                "weight": setWeight,
                                                "plates": plateCalculator.getPlatesPerSide(setWeight)
                                            }
                                        }
                                    )

                                    // TODO: 95 for bench/press, 135 for squat/dl
                                    const warmupSets = warmupGen.getSets(
                                        135, exerciseTrainingMax, sets[0].weight
                                    ).map(function (set) {
                                        return {
                                            "exercise": lift,
                                            "reps": set.reps,
                                            "weight": set.weight,
                                            "plates": plateCalculator.getPlatesPerSide(set.weight)
                                        }
                                    })

                                    return <SetGroup key={lift} name={lift} sets={warmupSets.concat(sets)} />
                                }

                            )
                        }
                        <SetGroup name="Accessories" sets={[]} />
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    }
}

export default Workout