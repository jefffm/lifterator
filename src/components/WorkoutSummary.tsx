import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid, Paper, Card, CardHeader, CardContent, Box, TableHead, Table, TableCell, TableRow } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        exercise: {
            padding: theme.spacing(1),
        },
        workout: {
            margin: theme.spacing(2),
            padding: theme.spacing(2),
        }
    }),
);

interface ExerciseSummaryProps {
    name: string
    topPct: number
    topWeight: number
    setCount: number
    volume: number
    unit: string
}

export function ExerciseSummary(props: ExerciseSummaryProps) {
    const classes = useStyles()
    {/* TODO: add reps to top set */ }
    return <TableRow>
        <TableCell>{props.name}</TableCell>
        <TableCell>{props.volume.toPrecision(4)}</TableCell>
        <TableCell> {props.topWeight} {props.unit} ({props.topPct}%) </TableCell>
    </TableRow>
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
    const classes = useStyles()
    return <Card className={classes.workout}>
        <h3>Phase {props.phaseNum} Workout {props.workoutNum}</h3>
        <h4>{props.setCount} sets, {props.volume} {props.unit}</h4>

        <CardContent>
            <Grid container direction="row" justify="flex-start" alignItems="stretch">
                <Grid item xs={12}>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Volume</TableCell>
                            <TableCell>Top set</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.exerciseSummaryComponents}
                    </TableBody>
                </Table>
            </Grid>
        </CardContent>
    </Card >
}