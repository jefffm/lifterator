import React, { Component, ReactNode } from 'react'
import Workout from './Workout'
import { ITrainingMaxes, ISetPrototype } from './Types'
import PlateCalculator from '../util/PlateCalculator'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'


// TODO: receive training maxes
type PhaseProps = {
    number: number
    trainingMaxes: ITrainingMaxes
    plateCalculator: PlateCalculator
    setProtos: ISetPrototype[]
}

export class Phase extends Component<PhaseProps> {
    render(): ReactNode {
        const number = this.props.number
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator
        const setProtos = this.props.setProtos

        // TODO: Add configuration for number of days and splits (eg. 4 day vs. 2 day)
        return <Row noGutters>
            <Workout
                number={1}
                phase={number}
                mainLifts={["Squat", "Bench Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                setProtos={setProtos}
            />
            <Workout
                number={2}
                phase={number}
                mainLifts={["Deadlift", "Overhead Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                setProtos={setProtos}
            />
        </Row>
    }
}

export default Phase