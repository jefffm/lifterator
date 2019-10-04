import React, { Component } from 'react'

import TrainingMaxesForm from '../components/TrainingMaxesForm'
import { VolumeForm } from '../components/VolumeForm'
import { IVolumeSettings, UPDATE_TM } from '../types';
import { Paper, Grid } from '@material-ui/core';
import { Exercise } from '../lib/Exercises';
import { AppState } from '../index';
import mainExercises from '../reducers/mainExercises';
import weightSettings, { IWeightSettings } from '../reducers/weightSettings';
import { connect } from 'react-redux';
import { updateTM } from '../actions/index';
import { render } from 'react-dom';

interface ConfigurationPanelProps {
    weightSettings: IWeightSettings  // TODO: weight settings type
    mainExercises: Map<string, Exercise>
    volumeSettings: IVolumeSettings
    dispatch: any
}

export class ConfigurationPanel extends Component<ConfigurationPanelProps> {

    render() {
        return <div>
            <Grid container direction="row" justify="flex-start" alignItems="stretch">
                <Grid item sm={6}>
                    <Paper>
                        <TrainingMaxesForm
                            unit={this.props.weightSettings.unit}
                            mainExercises={this.props.mainExercises}
                            updateTrainingMax={
                                (e: Exercise) => (tm: number) => {
                                    this.props.dispatch(
                                        { type: UPDATE_TM, exercise: e, trainingMax: tm }
                                    )
                                }
                            }
                        />
                    </Paper>
                </Grid>

                <Grid item sm={6}>
                    <Paper>
                        <VolumeForm volumeSettings={this.props.volumeSettings} />
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