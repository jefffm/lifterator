import React from 'react'
import { Reps, SetType } from '../lib/Types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { Typography } from '@material-ui/core'

export type WorkoutSetProps = {
    exercise: string
    reps: Reps
    weight: number
    plates: number[]
}

export function WorkoutSetRow(props: WorkoutSetProps) {
    const reps = props.reps
    const weight = props.weight
    const plates = props.plates

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
        <TableCell>{
            <Typography>
                {props.exercise}
            </Typography>
        }</TableCell>
        <TableCell>{reps.num}{repsToken}</TableCell>
        <TableCell>{weight}</TableCell>
        <TableCell align="left">
            {plates.join(", ")}
        </TableCell>
    </TableRow>
}

export default WorkoutSetRow