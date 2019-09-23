import React, { Component, ReactNode } from 'react'
import Workout from './Workout'
import IntensityScheme, { ITrainingMaxes } from './Types'
import PlateCalculator from '../util/PlateCalculator'


// TODO: receive training maxes
type PhaseProps = {
    number: number
    intensityScheme: IntensityScheme
    trainingMaxes: ITrainingMaxes
    plateCalculator: PlateCalculator
}

export class Phase extends Component<PhaseProps> {
    render(): ReactNode {
        const number = this.props.number
        const intensityScheme = this.props.intensityScheme
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator

        return <div className="card phase">
            <h2>Phase {number}</h2>
            <Workout
                number={1}
                intensityScheme={intensityScheme}
                mainLifts={["Squat", "Bench Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
            />
            <Workout
                number={2}
                intensityScheme={intensityScheme}
                mainLifts={["Deadlift", "Overhead Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
            />
        </div>
    }
}

export default Phase