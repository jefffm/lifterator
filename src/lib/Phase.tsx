import React, { Component, ReactNode } from 'react'
import Workout from './Workout'

type IntensityScheme = '5s' | '3s' | '1s'

type PhaseProps = {
    number: number
    intensityScheme: IntensityScheme
}

var INTENSITY_SCHEME_DATA = {
    '5s': [0.65, 0.75, 0.85],
    '3s': [0.70, 0.80, 0.90],
    '1s': [0.75, 0.85, 0.95]
}

export class Phase extends Component<PhaseProps> {
    render(): ReactNode {
        const number = this.props.number

        return <div className="card phase">
            <h2>Phase {number}</h2>
            <Workout number={1} />
            <Workout number={2} />
        </div>
    }
}

export default Phase