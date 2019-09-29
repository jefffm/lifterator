import React from 'react';

import { IVolumeSettings } from '../lib/Types'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

interface VolumeFormProps {
    volumeSettings: IVolumeSettings
    onChange: (name: string) => (event: React.ChangeEvent<any>) => void
}

export const VolumeForm = (props: VolumeFormProps) => {
    const classes = useStyles();

    return (
        <div hide-print className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Supplemental Volume</FormLabel>
                First Set Last
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.volumeSettings.firstSetLastFives || false}
                                onChange={props.onChange('firstSetLastFives')} />
                        }
                        label="5x5 sets"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.volumeSettings.firstSetLastAmrap || false}
                                onChange={props.onChange('firstSetLastAmrap')} />
                        }
                        label="AMRAP set"
                    />
                </FormGroup>
                <FormHelperText>Add supplemental volume sets</FormHelperText>
            </FormControl>
        </div >
    );
}