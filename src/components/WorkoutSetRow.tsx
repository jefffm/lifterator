import React from 'react'
import { Reps, SetType } from '../types'
import { Card, Grid } from '@material-ui/core'

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
        <div>
        {props.isNext ? "NEXT SET " : ""}{reps.num}{repsToken} x {weight}
        </div>
        <div>
        [{plates.join(", ")}]
        </div>
    </Grid>
}

export default WorkoutSetRow