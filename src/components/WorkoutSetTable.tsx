import React from 'react'
import { WorkoutSet, WorkoutSetProps } from './WorkoutSetRow'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
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


type SetGroupProps = {
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
        setElems.push(<WorkoutSet
            key={i}
            exercise={item.exercise}
            reps={item.reps}
            weight={item.weight}
            plates={item.plates}
            unit={unit}
        />)
    }
    return <div className={classes.root}>
        <Table className={classes.table} size="small">
            <TableHead>
                {name}
            </TableHead>
            <TableBody>
                {setElems}
            </TableBody>
        </Table>
    </div>
}