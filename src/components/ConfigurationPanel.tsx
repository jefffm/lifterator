import React from 'react'

import TrainingMaxesForm from '../components/TrainingMaxesForm'
import { VolumeForm } from '../components/VolumeForm'
import { IExerciseWeightMapping, IVolumeSettings } from '../lib/Types';
import { Paper, Box } from '@material-ui/core';

interface ConfigurationPanelProps {
    unit: string
    trainingMaxes: IExerciseWeightMapping
    volumeSettings: IVolumeSettings
    onChange: (name: string) => (name: string) => (event: React.ChangeEvent<any>) => void
}

export default function ConfigurationPanel(props: ConfigurationPanelProps) {
    return <div>
        {/* Training Maxes configuration */}
        <Paper>
            <TrainingMaxesForm
                trainingMaxes={props.trainingMaxes}
                onChange={props.onChange('trainingMaxes')}
                unit={props.unit}
            />
        </Paper>

        {/* Supplemental volume configuration */}
        <Paper>
            <VolumeForm
                volumeSettings={props.volumeSettings}
                onChange={props.onChange('volumeSettings')}
            />
        </Paper>
    </div>
}