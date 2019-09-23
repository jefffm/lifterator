import React, { Component, ReactNode } from 'react'
import Workout from './Workout'
import IntensityScheme from './Types'


// TODO: receive training maxes
type PhaseProps = {
    number: number
    intensityScheme: IntensityScheme
    trainingMaxes: object
}

export class Phase extends Component<PhaseProps> {
    render(): ReactNode {
        const number = this.props.number
        const intensityScheme = this.props.intensityScheme
        const trainingMaxes = this.props.trainingMaxes

        return <div className="card phase">
            <h2>Phase {number}</h2>
            <Workout
                number={1}
                intensityScheme={intensityScheme}
                mainLifts={["Squat", "Bench Press"]}
                trainingMaxes={trainingMaxes} />
            <Workout
                number={2}
                intensityScheme={intensityScheme}
                mainLifts={["Deadlift", "Overhead Press"]}
                trainingMaxes={trainingMaxes} />
        </div>
    }
}

export default Phase