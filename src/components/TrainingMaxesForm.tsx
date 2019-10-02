import React from 'react'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useStyles } from './ConfigurationCommon';
import ExerciseProvider from '../lib/Exercises';

interface ITrainingMaxesFormProps {
    exerciseProvider: ExerciseProvider
    // TODO: how tf is this onChange handler going to work with ExerciseProvider?
    onChange: (name: string) => (event: React.ChangeEvent<any>) => void
    unit: string
}

const TrainingMaxesForm = (props: ITrainingMaxesFormProps) => {
    const classes = useStyles();

    const elems = props.exerciseProvider.filterWithTms().map(
        exercise => {
            return <TextField
                key={exercise.shortname}
                className={clsx(classes.textField)}
                variant="outlined"
                label={exercise.name}
                type="number"
                onChange={props.onChange(exercise.shortname)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                }}
            />
        }
    )

    return (
        <div hide-print className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
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