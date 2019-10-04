import React from 'react'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useStyles } from '../lib/ConfigurationCommon';
import { Exercise } from '../lib/Exercises';
import { IMainExercisesState } from '../reducers/mainExercises'

interface ITrainingMaxesFormProps {
    unit: string
    mainExercises: IMainExercisesState
    updateTrainingMax(e: Exercise): (tm: number) => void
}

const TrainingMaxesForm = (props: ITrainingMaxesFormProps) => {
    const classes = useStyles();

    const elems = Array.from(Object.values(props.mainExercises))
        .map(
            exercise => {
                return <TextField
                    key={exercise.shortname}
                    className={clsx(classes.textField)}
                    variant="outlined"
                    label={exercise.name}
                    value={exercise.trainingMax}
                    type="number"
                    onChange={
                        (event) => [
                            props.updateTrainingMax(exercise)(parseInt(event.currentTarget.value))
                        ]
                    }
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                    }}
                />
            }
        )

    return (
        <div hide-print className={classes.root}>
            <FormControl
                component="fieldset"
                className={classes.formControl}>
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