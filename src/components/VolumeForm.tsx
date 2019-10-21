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
                <FormLabel component="legend">Program Options</FormLabel>
                <FormGroup>
                    {
                        [
                            [props.volumeSettings.lastSetAmrap, "lastSetAmrap", "Last Set AMRAP"],
                            [props.volumeSettings.firstSetLastFives, "firstSetLastFives", "FSL 5x5"],
                            [props.volumeSettings.firstSetLastAmrap, "firstSetLastAmrap", "FSL AMRAP"],
                        ].map(function ([field, fieldname, name]) {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={field as boolean}
                                            onChange={e => props.toggleVolumeField(fieldname as string)}
                                        />
                                    }
                                    label={name}
                                />

                            )
                        })
                    }
                </FormGroup>
                <FormHelperText>Add supplemental volume sets</FormHelperText>
            </FormControl>
        </div >
    );
}