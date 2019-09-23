import React, { ReactNode, Component } from 'react'; // we need this to make JSX compile

export type WorkoutSetProps = {
    exercise: string
    reps: number
    weight: number
    plates: number[]
}

export class WorkoutSet extends Component<WorkoutSetProps> {

    render(): ReactNode {
        const exercise = this.props.exercise
        const reps = this.props.reps
        const weight = this.props.weight
        const plates = this.props.plates

        return <tr>
            <td>{exercise}</td>
            <td>{reps}x</td>
            <td>{weight} lbs</td>
            <td>({plates.join(", ")})</td>
        </tr>
    }
}

export default WorkoutSet