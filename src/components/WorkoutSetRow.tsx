import React, { ReactNode, Component } from 'react'
import { Reps, SetType } from '../lib/Types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

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

        {/* TODO: set the key? */ }
        return <TableRow>
            <TableCell>{reps.num}{repsToken}</TableCell>
            <TableCell>{weight} {unit}</TableCell>
            <TableCell align="left">
                {plates.join(", ")}
            </TableCell>
        </TableRow>
    }
}

export default WorkoutSet