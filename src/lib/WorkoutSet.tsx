import React, { ReactNode, Component } from 'react'; // we need this to make JSX compile

export type WorkoutSetProps = {
    exercise: string
    reps: number
    weight: number
    plates: number[]
    unit: string
}

export class WorkoutSet extends Component<WorkoutSetProps> {

    render(): ReactNode {
        //const exercise = this.props.exercise
        const reps = this.props.reps
        const weight = this.props.weight
        const plates = this.props.plates
        const unit = this.props.unit

        return <tr>
            <td>{reps}x</td>
            <td>{weight} {unit}</td>
            <td style={{ textAlign: 'left' }}>
                {plates.join(", ")}
            </td>
        </tr>
    }
}

export default WorkoutSet