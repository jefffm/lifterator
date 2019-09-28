import React, { Component, ReactNode } from 'react'
import SetGroup from './SetGroup';
import { round5 } from '../util/Math';
import PlateCalculator from '../util/PlateCalculator'
import { ISetPrototype, SetType } from './Types'
import Grid from '@material-ui/core/Grid'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import WarmupGen from './WarmupGen'

type WorkoutProps = {
    number: number
    phase: number
    mainLifts: string[]
    trainingMaxes: object
    plateCalculator: PlateCalculator
    warmupGen: WarmupGen
    setProtos: ISetPrototype[]
    unit: string
};

export class Workout extends Component<WorkoutProps> {
    render(): ReactNode {
        const number = this.props.number
        const phase = this.props.phase
        const setProtos = this.props.setProtos
        const mainLifts = this.props.mainLifts
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator
        const warmupGen = this.props.warmupGen
        const unit = this.props.unit

        return <Grid container direction="column" justify="space-evenly" alignItems="stretch" >
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
                                                "reps": setReps,
                                                "weight": setWeight,
                                                "unit": unit,
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
                                            "reps": { "num": set.reps, "setType": SetType.WARMUP },
                                            "weight": set.weight,
                                            "unit": unit,
                                            "plates": plateCalculator.getPlatesPerSide(set.weight)
                                        }
                                    })

                                    return <SetGroup
                                        key={lift}
                                        name={lift}
                                        sets={warmupSets.concat(sets)}
                                        unit={unit} />
                                }

                            )
                        }
                        <SetGroup name="Accessories" sets={[]} unit={unit} />
                    </Row>
                </Card.Body>
            </Card>
        </Grid >
    }
}

export default Workout