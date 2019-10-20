import { combineReducers } from "redux";

import mainExercises from "./mainExercises";
import setSettings from "./setSettings";
import weightSettings from "./weightSettings";
import workoutDays from "./workoutDays";
import phaseIntensityRepSchemes from "./PhaseIntensityRepSchemes";

export default combineReducers({
  mainExercises,
  phaseIntensityRepSchemes,
  setSettings: setSettings,
  weightSettings,
  workoutDays
});
