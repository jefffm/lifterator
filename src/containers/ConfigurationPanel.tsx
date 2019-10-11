import React, { Component } from 'react'

import TrainingMaxesForm from '../components/TrainingMaxesForm'
import { VolumeForm } from '../components/VolumeForm'
import { IVolumeSettings, UPDATE_TM } from '../types';
import { Paper, Grid } from '@material-ui/core';
import { Exercise } from '../lib/ExerciseProvider';
import { AppState } from '../index';
import { IWeightSettings } from '../reducers/weightSettings';
import { connect } from 'react-redux';
import { updateTM, setVolumeField } from '../actions/index';
import { IMainExercisesState } from '../reducers/mainExercises';

interface ConfigurationPanelProps {
    weightSettings: IWeightSettings  // TODO: weight settings type
    mainExercises: IMainExercisesState
    volumeSettings: IVolumeSettings
    dispatch: any
}

export class ConfigurationPanel extends Component<ConfigurationPanelProps> {
    updateTmFunc = (exercise: Exercise) => (trainingMax: number) => {
        this.props.dispatch(updateTM(exercise, trainingMax));
    }

    toggleVolumeField = (fieldname: string) => {
        const currentVal = this.props.volumeSettings[fieldname]
        this.props.dispatch(setVolumeField(fieldname, !currentVal))
    }

    render() {
        return <div>
            <Grid container direction="row" justify="flex-start" alignItems="stretch">
                <Grid item sm={6}>
                    <Paper>
                        <TrainingMaxesForm
                            unit={this.props.weightSettings.unit}
                            mainExercises={this.props.mainExercises}
                            updateTrainingMax={this.updateTmFunc}
                        />
                    </Paper>
                </Grid>

                <Grid item sm={6}>
                    <Paper>
                        <VolumeForm
                            volumeSettings={this.props.volumeSettings}
                            toggleVolumeField={this.toggleVolumeField}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

const mapStateToProps = (state: AppState) => ({
    weightSettings: state.weightSettings,
    mainExercises: state.mainExercises,
    volumeSettings: state.volumeSettings,
})

export default connect(mapStateToProps)(ConfigurationPanel)