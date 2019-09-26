import React, { ReactNode, Component } from 'react'; // we need this to make JSX compile
import { Reps, SetType } from './Types';
import { stringLiteralTypeAnnotation } from '@babel/types';

export type WorkoutSetProps = {
    exercise: string
    reps: Reps
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

        // TODO: wtf this can't be the right way to do this
        const repsToken = (
            () => {
                switch (reps.setType) {
                    case SetType.AMRAP:
                        return "+"
                    case SetType.JOKER:
                        return "?"
                    default:
                        return "x"

                }
            }
        )()

        return <tr>
            <td>{reps.num}{repsToken}</td>
            <td>{weight} {unit}</td>
            <td style={{ textAlign: 'left' }}>
                {plates.join(", ")}
            </td>
        </tr >
    }
}

export default WorkoutSet