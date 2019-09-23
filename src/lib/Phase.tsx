import React, { Component, ReactNode } from 'react'
import Workout from './Workout'
import { ITrainingMaxes, ISetPrototype } from './Types'
import PlateCalculator from '../util/PlateCalculator'


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
        return <div className="card phase">
            <h2>Phase {number}</h2>
            <Workout
                number={1}
                mainLifts={["Squat", "Bench Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                setProtos={setProtos}
            />
            <Workout
                number={2}
                mainLifts={["Deadlift", "Overhead Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                setProtos={setProtos}
            />
        </div>
    }
}

export default Phase