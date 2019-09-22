import React, { Component, ReactNode } from 'react'
import SetGroup from './SetGroup';

type WorkoutProps = {
    number: number
};

export class Workout extends Component<WorkoutProps> {
    render(): ReactNode {
        const number = this.props.number

        return <div className="card">
            <h3>Workout {number}</h3>
            <SetGroup name="deadlift" />
            <SetGroup name="overhead press" />
            <SetGroup name="accessory" />
        </div>
    }
}

export default Workout