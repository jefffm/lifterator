import { combineReducers } from 'redux'

import mainExercises from './mainExercises';
import volumeSettings from './volumeSettings';
import weightSettings from './weightSettings';
import workoutDays from './workoutDays';
import phaseIntensityRepSchemes from './PhaseIntensityRepSchemes';

export default combineReducers({
    mainExercises,
    phaseIntensityRepSchemes,
    volumeSettings,
    weightSettings,
    workoutDays,
})