import React from 'react'
import { WorkoutSetRow, WorkoutSetProps } from './WorkoutSetRow'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
        },
        paper: {
            marginTop: theme.spacing(3),
            width: '100%',
            overflowX: 'auto',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 100,
        },
    }),
);


export type SetGroupProps = {
    name: string
    sets: WorkoutSetProps[]
    unit: string
};

export default function SetGroup(props: SetGroupProps) {
    const classes = useStyles()

    const name = props.name
    const sets = props.sets
    const unit = props.unit

    var setElems = []
    for (const [i, item] of sets.entries()) {
        setElems.push(
            <WorkoutSetRow
                key={i}
                isNext={i === 0}
                exercise={item.exercise}
                reps={item.reps}
                weight={item.weight}
                unit={unit}
                plates={item.plates}
            />
        )
    }
    return <div className={classes.root}>
        <Typography>
            <h2>{name}</h2>
        </Typography>
        <Grid container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="stretch">
            {setElems}
        </Grid>

    </div>
}