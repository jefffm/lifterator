import React from 'react'
import { Container, Grid } from '@material-ui/core'


interface ExerciseSummaryProps {
    name: string
    topPct: number
    topWeight: number
    unit: string
}

function ExerciseSummary(props: ExerciseSummaryProps) {
    return <Grid item>
        <p>
            Name: {props.name}
        </p>
        <p>
            Peak Intensity: {props.topPct} ({props.topWeight} {props.unit})
        </p>
    </Grid>
}


interface WorkoutSummaryProps {
    phaseNum: number
    workoutNum: number
    setCount: number
    volume: number
    unit: string
}

/**
 *  Display summarized stats about the current workout
 * 
 * TODOs:
 * - What are the main exercises for this day?
 * - What is the top percentage for the heaviest set for each exercise?
 * - What is the top weight for the heaviest set for each exercise?
 * - What unique accessory sets are there for this day?
 */
export default function WorkoutSummary(props: WorkoutSummaryProps) {
    return <Grid container direction="row" justify="flex-start" alignItems="stretch">
        <Grid item xs={12}>
            <h3>Phase {props.phaseNum} Workout {props.workoutNum}</h3>
            <p>total sets: {props.setCount}</p>
            <p>total volume: {props.volume} {props.unit}</p>
        </Grid>
        <ExerciseSummary
            name="test exercise"
            topPct={95}
            topWeight={200}
            unit={props.unit} />
        <ExerciseSummary
            name="test exercise"
            topPct={95}
            topWeight={200}
            unit={props.unit} />
    </Grid>
}