import React, { Component, ReactNode } from 'react'
import Workout from './Workout'

type PhaseProps = {
    number: number
};

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