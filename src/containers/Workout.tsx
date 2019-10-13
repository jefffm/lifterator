import React from 'react'
import { Container, Grid, Button } from '@material-ui/core'
import { AppState } from '..';
import { connect } from 'react-redux';
import PlateCalculator from '../util/PlateCalculator';
import { IWeightSettings } from '../reducers/weightSettings';
import { IMainExercisesState } from '../reducers/mainExercises';
import { IVolumeSettings, IWorkoutPrototype } from '../types';
import { IntensityRepScheme } from '../reducers/PhaseIntensityRepSchemes';
import { BeyondWarmupGen } from '../lib/WarmupGen';
import ExerciseProvider from '../lib/ExerciseProvider';
import Cycle from '../lib/Cycle';
import { withRouter, RouteComponentProps } from 'react-router'

interface WorkoutProps {
    workoutId: string
    weightSettings: IWeightSettings
    mainExercises: IMainExercisesState
    volumeSettings: IVolumeSettings
    phaseIntensityRepSchemes: IntensityRepScheme[]
    workoutDays: IWorkoutPrototype[]
    dispatch: any
}

class Workout extends React.Component<WorkoutProps & RouteComponentProps> {
    render = (): React.ReactNode => {
        // TODO uncopypasta this somehow
        const plateCalculator = new PlateCalculator(
            {
                availablePlates: this.props.weightSettings.availablePlates,
                barWeight: this.props.weightSettings.barWeight
            }
        )
        // TODO: make warmupGen configurable
        const warmupGen = new BeyondWarmupGen(this.props.mainExercises)
        const exerciseProvider = new ExerciseProvider(Object.values(this.props.mainExercises))

        const cycle = new Cycle({
            unit: this.props.weightSettings.unit,
            phaseIntensityRepSchemes: this.props.phaseIntensityRepSchemes,
            volumeSettings: this.props.volumeSettings,
            exerciseProvider: exerciseProvider,
            warmupGen: warmupGen,
            plateCalculator: plateCalculator,
            workoutPrototypes: this.props.workoutDays
        })

        // TODO uncopypasta this somehow

        const tokens = this.props.workoutId.split("-")
        const phaseNum = parseInt(tokens[0])
        const workoutNum = parseInt(tokens[1])

        const workout = cycle.getWorkout(phaseNum, workoutNum)

        return <Container>
            <Grid container direction="column" justify="flex-start" alignItems="flex-start" >
                <Button variant="contained" onClick={() => this.props.history.goBack()}>Back</Button>
                {workout.getSetsAsWorkout()}
            </Grid>
        </Container>
    }
}

const mapStateToProps = (state: AppState) => ({
    mainExercises: state.mainExercises,
    phaseIntensityRepSchemes: state.phaseIntensityRepSchemes,
    volumeSettings: state.volumeSettings,
    weightSettings: state.weightSettings,
    workoutDays: state.workoutDays,
})

export default connect(mapStateToProps)(withRouter(Workout))