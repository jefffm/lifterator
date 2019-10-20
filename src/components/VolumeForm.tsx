import React from 'react';

import { ISetSettings } from '../types'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import { useStyles } from '../lib/ConfigurationCommon';

interface VolumeFormProps {
    volumeSettings: ISetSettings
    toggleVolumeField: (fieldname: string) => void
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
                                checked={props.volumeSettings.firstSetLastFives}
                                onChange={e => props.toggleVolumeField("firstSetLastFives")}
                            />
                        }
                        label="5x5 sets"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.volumeSettings.firstSetLastAmrap}
                                onChange={e => props.toggleVolumeField("firstSetLastAmrap")}
                            />
                        }
                        label="AMRAP set"
                    />
                </FormGroup>
                <FormHelperText>Add supplemental volume sets</FormHelperText>
            </FormControl>
        </div >
    );
}