import React from 'react'
import SetGroup, { SetGroupProps } from './WorkoutSetTable';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

type WorkoutProps = {
    number: number
    phase: number
    setGroupProps: SetGroupProps[]
};

export function Workout(props: WorkoutProps) {
    const number = props.number
    const phase = props.phase
    const setGroupProps = props.setGroupProps

    const classes = useStyles()

    return <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
                Phase {phase + 1}: Workout {number}
            </Typography>
            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="flex-start" >
                {setGroupProps.map(set => {
                    return <Grid item xs={12} md={6}>
                        {<SetGroup {...set} />}
                    </Grid>
                })}
            </Grid >
        </Paper>
    </div>
}

export default Workout