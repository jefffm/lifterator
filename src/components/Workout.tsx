import React from 'react'
import SetGroup, { SetGroupProps } from './WorkoutSetTable';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { AppBar, Fab, Divider } from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from "@material-ui/icons/Add"
import WorkoutSetRow from './WorkoutSetRow';


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
        appBar: {
            top: 'auto',
            bottom: 0,
        },
        fabButton: {
            //position: 'absolute',
            //zIndex: 1,
            //top: -30,
            //left: 0,
            //right: 0,
            //margin: '0 auto',
        },
        toolbar: theme.mixins.toolbar,
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

    // TODO: fetch the *actual* next set
    const currentSetGroup = setGroupProps[0]
    const currentSet = currentSetGroup.sets[3]

    // TODO: floating "up next" panel with the next set and success/fail
    return <div className={classes.root}>
        <Typography variant="h5" component="h3">
            Phase {phase}: Workout {number}
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

        <div className={classes.toolbar}>
            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                <Grid container
                    component={Paper}
                    className={classes.paper}
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">
                    <Grid item xs={4}>
                        <h2>
                            {currentSetGroup.name}
                        </h2>
                    </Grid>
                    <Grid item xs={8}>
                        <h3>
                            <WorkoutSetRow
                                exercise={currentSetGroup.name}
                                reps={currentSet.reps}
                                weight={currentSet.weight}
                                unit={currentSetGroup.unit}
                                plates={currentSet.plates}
                            />
                        </h3>
                    </Grid>

                    <Divider />

                    <Grid item xs={6}>
                        <Fab color="inherit" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                    </Grid>

                    <Grid item xs={3}>
                        <Fab color="secondary" aria-label="fail" className={classes.fabButton}>
                            <ClearIcon />
                        </Fab>
                    </Grid>

                    <Grid item xs={3}>
                        <Fab color="primary" aria-label="done" className={classes.fabButton}>
                            <CheckIcon />
                        </Fab>
                    </Grid>

                </Grid>
            </AppBar>
        </div>
    </div>
}

export default Workout