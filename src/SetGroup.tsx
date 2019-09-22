import React, { Component, ReactNode } from 'react'
import WorkoutSet from './WorkoutSet'

type SetGroupProps = {
    name: string
};

export class SetGroup extends Component<SetGroupProps> {
    render(): ReactNode {
        const name = this.props.name

        return <div className="card workout">
            <h3>{name}</h3>
            <table>
                <WorkoutSet exercise="Deadlift" reps={5} weight={190} />
                <WorkoutSet exercise="Deadlift" reps={5} weight={190} />
                <WorkoutSet exercise="Deadlift" reps={5} weight={190} />
                <WorkoutSet exercise="Deadlift" reps={5} weight={190} />
                <WorkoutSet exercise="Deadlift" reps={5} weight={190} />
            </table>
        </div>
    }
}

export default SetGroup