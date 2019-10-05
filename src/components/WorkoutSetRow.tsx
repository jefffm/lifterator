import React from 'react'
import { Reps, SetType } from '../types'
import { Badge, Card, Grid, Button, Chip, Box } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export type WorkoutSetProps = {
    exercise: string
    reps: Reps
    weight: number
    plates: number[]
    isNext: boolean | undefined
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

    return <Grid item xs={6} sm={3} md={6} component={Card}>
        {reps.num}{repsToken}
        {weight}
        <Box>
            {
                plates.map(plate => {
                    return <Chip size="small" label={plate} />
                })
            }
        </Box>
    </Grid>
}

export default WorkoutSetRow