import React from 'react'
import { Reps, SetType } from '../types'
import { Grid, Chip, TableCell, TableRow } from '@material-ui/core'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isUndefined } from 'util';


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(3),
        },
        textField: {
            margin: theme.spacing(1),
        },
        setData: {
        },
        menu: {
        },
    }),
)


export type WorkoutSetProps = {
    exercise: string
    reps: Reps
    weight: number
    unit: string
    plates?: number[]
    isNext?: boolean | undefined
}

export function WorkoutSetRow(props: WorkoutSetProps) {
    const classes = useStyles();

    const reps = props.reps
    const weight = props.weight
    const unit = props.unit

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

    const plates = isUndefined(props.plates)
        ? []
        : (props.plates as number[]).map(
            plate => (
                <Chip size="small" label={plate} />
            )
        )

    return <TableRow>
        <TableCell>
            {reps.num}{repsToken}

            {weight} {unit}
        </TableCell>
        <TableCell>
            {plates}
        </TableCell>
    </TableRow>
}

export default WorkoutSetRow