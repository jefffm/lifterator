import React from 'react'
import { Container, Grid, Paper, Card, CardHeader, CardContent } from '@material-ui/core'


interface ExerciseSummaryProps {
    name: string
    topPct: number
    topWeight: number
    setCount: number
    volume: number
    unit: string
}

export function ExerciseSummary(props: ExerciseSummaryProps) {
    return <Grid item xs={6}>
        <p>
            Name: {props.name}
        </p>
        <p>
            Volume: {props.volume}
        </p>
        <p>
            Top set: {props.topWeight} {props.unit} ({props.topPct}%)
        </p>
    </Grid>
}


interface WorkoutSummaryProps {
    phaseNum: number
    workoutNum: number
    setCount: number
    volume: number
    unit: string
    exerciseSummaryComponents: any[]
}

/**
 *  Display summarized stats about the current workout
 * 
 * TODOs:
 * - Why doesn't CardHeader work?
 * - What are the main exercises for this day?
 * - What is the top percentage for the heaviest set for each exercise?
 * - What is the top weight for the heaviest set for each exercise?
 * - What unique accessory sets are there for this day?
 */
export default function WorkoutSummary(props: WorkoutSummaryProps) {
    return <Card>
        <h3>Phase {props.phaseNum} Workout {props.workoutNum}</h3>
        <CardContent>

            <Grid container direction="row" justify="flex-start" alignItems="stretch">
                <Grid item xs={12}>
                    <p>total sets: {props.setCount}</p>
                    <p>total volume: {props.volume} {props.unit}</p>
                </Grid>
                {props.exerciseSummaryComponents}
            </Grid>
        </CardContent>
    </Card >
}