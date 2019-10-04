import { Exercise } from "../lib/Exercises"
import {
    MainExerciseActionTypes, UPDATE_TM,
    VolumeSettingsActionTypes, SET_VOLUME_FIELD,
} from '../types';

export function updateTM(exercise: Exercise, trainingMax: number): MainExerciseActionTypes {
    return {
        type: UPDATE_TM,
        exercise: exercise,
        trainingMax: trainingMax
    }
}

export function setVolumeField(field: string, value: boolean): VolumeSettingsActionTypes {
    return {
        type: SET_VOLUME_FIELD,
        field: field,
        value: value,
    }
}