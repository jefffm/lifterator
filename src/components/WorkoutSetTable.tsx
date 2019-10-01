import React from 'react'
import { WorkoutSetRow, WorkoutSetProps } from './WorkoutSetRow'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import { TableRow, TableCell } from '@material-ui/core'



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


type SetGroupProps = {
    name: string
    sets: WorkoutSetProps[]
    unit: string
};

export default function SetGroup(props: SetGroupProps) {
    const classes = useStyles()

    const name = props.name
    const sets = props.sets

    var setElems = []
    for (const [i, item] of sets.entries()) {
        setElems.push(<WorkoutSetRow
            key={i}
            exercise={item.exercise}
            reps={item.reps}
            weight={item.weight}
            plates={item.plates}
        />)
    }
    return <div className={classes.root}>
        <Table className={classes.table} size="small">
            <colgroup>
                <col width="5%" />
                <col width="2%" />
                <col width="8%" />
                <col width="33%" />
            </colgroup>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={4}>
                        {name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Exercise</TableCell>
                    <TableCell>Reps</TableCell>
                    <TableCell>Weight ({props.unit})</TableCell>
                    <TableCell>Plates</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {setElems}
            </TableBody>
        </Table>
    </div>
}