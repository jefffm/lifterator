import React from 'react'
import clsx from 'clsx'
import { IExerciseWeightMapping } from '../lib/Types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(3),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        dense: {
            marginTop: 19,
        },
        menu: {
            width: 200,
        },
    }),
)

interface ITrainingMaxesFormProps {
    trainingMaxes: IExerciseWeightMapping
    handleChange: (event: any, key: string) => void
    unit: string
    validated: boolean
}

const TrainingMaxesForm = (props: ITrainingMaxesFormProps) => {
    const classes = useStyles();

    const changeHandler = props.handleChange
    const unit = props.unit

    const elems = Object.keys(props.trainingMaxes).map(
        key => {
            return <TextField
                key={key}
                className={clsx(classes.textField)}
                variant="outlined"
                label={key}
                onChange={function (e: any) { return changeHandler(e, key) }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                }}
            />
        }
    )

    return (
        <div hide-print className={classes.container}>
            <FormControl component="fieldset">
                <FormLabel component="legend">
                    Training Maxes
            </FormLabel>
                <FormGroup>
                    {elems}
                </FormGroup>
            </FormControl>
        </div>
    );
}

export default TrainingMaxesForm