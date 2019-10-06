import React from 'react'
import { Reps, SetType } from '../types'
import { Badge, Card, Grid, Button, Chip, Box, Typography, Paper } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


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
        dense: {
            marginTop: 19,
            backgroundColor: theme.palette.background.paper
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
    plates: number[]
    isNext: boolean | undefined
}

export function WorkoutSetRow(props: WorkoutSetProps) {
    const classes = useStyles();

    const reps = props.reps
    const weight = props.weight
    const unit = props.unit
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

    return <Grid container item
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        xs={6} sm={3} md={6}
        className={classes.dense}>

        <Grid item>
            {reps.num}{repsToken}
        </Grid>

        <Grid item>
            {weight} {unit}
        </Grid>

        <Grid item>
            {
                plates.map(plate => {
                    return <Chip size="small" label={plate} />
                })
            }
        </Grid>
    </Grid >
}

export default WorkoutSetRow