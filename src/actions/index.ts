import { Exercise } from "../lib/ExerciseProvider";
import {
  MainExerciseActionTypes,
  UPDATE_TM,
  SetSettingsActionTypes,
  SET_SETTINGS_FIELD
} from "../types";

export function updateTM(
  exercise: Exercise,
  trainingMax: number
): MainExerciseActionTypes {
  return {
    type: UPDATE_TM,
    exercise: exercise,
    trainingMax: trainingMax
  };
}

export function setSettingsField(
  field: string,
  value: boolean
): SetSettingsActionTypes {
  return {
    type: SET_SETTINGS_FIELD,
    field: field,
    value: value
  };
}
