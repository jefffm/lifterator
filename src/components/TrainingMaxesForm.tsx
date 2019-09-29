import React from 'react'
import clsx from 'clsx'
import { IExerciseWeightMapping } from '../lib/Types';

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useStyles } from './ConfigurationCommon';

interface ITrainingMaxesFormProps {
    trainingMaxes: IExerciseWeightMapping
    onChange: (name: string) => (event: React.ChangeEvent<any>) => void
    unit: string
}

const TrainingMaxesForm = (props: ITrainingMaxesFormProps) => {
    const classes = useStyles();

    const elems = Object.keys(props.trainingMaxes).map(
        key => {
            return <TextField
                key={key}
                className={clsx(classes.textField)}
                variant="outlined"
                label={key}
                onChange={props.onChange(key)}
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