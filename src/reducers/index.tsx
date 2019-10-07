import { combineReducers } from 'redux'

import mainExercises from './mainExercises';
import setProtoConfig from './setProtoConfig';
import volumeSettings from './volumeSettings';
import weightSettings from './weightSettings';
import workoutDays from './workoutDays';

export default combineReducers({
    mainExercises,
    setProtoConfig,
    volumeSettings,
    weightSettings,
    workoutDays,
})