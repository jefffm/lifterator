import React, { Component } from 'react'

import TrainingMaxesForm from '../components/TrainingMaxesForm'
import { VolumeForm } from '../components/VolumeForm'
import { IVolumeSettings, UPDATE_TM } from '../types';
import { Paper, Box } from '@material-ui/core';
import ExerciseProvider, { Exercise } from '../lib/Exercises';
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
}

export class ConfigurationPanel extends React.Component<ConfigurationPanelProps> {

    render() {
        return <div>
            {/* Training Maxes configuration */}
            <Paper>
                {/*}
            <TrainingMaxesForm
                unit={props.weightSettings.unit}
                mainExercises={mainExercises}
                exerciseProvider={props.exerciseProvider}
            />
            {*/}
            </Paper>

            {/* Supplemental volume configuration */}
            <Paper>
                <VolumeForm volumeSettings={this.props.volumeSettings} />
            </Paper>
        </div>
    }
}

const mapStateToProps = (state: any) => ({
    weightSettings: state.weightSettings,
    mainExercises: state.mainExercises,
    volumeSettings: state.volumeSettings,
})

export default connect(
    mapStateToProps,
    {}
)(ConfigurationPanel)