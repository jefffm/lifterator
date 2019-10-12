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
    return <Grid className={classes.exercise} item xs={6}>
        <Box border={1}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Volume</TableCell>
                        <TableCell>Top set</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{props.name}</TableCell>
                        <TableCell>{props.volume}</TableCell>
                        <TableCell>
                            {props.topWeight} {props.unit} ({props.topPct}%)
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {/* TODO: add reps to top set */}
        </Box>
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
    const classes = useStyles()
    return <Card className={classes.workout}>
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