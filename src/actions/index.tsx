import { Exercise } from "../lib/Exercises"
import { MainExerciseActionTypes, UPDATE_TM } from '../types';

export function updateTM(exercise: Exercise, trainingMax: number): MainExerciseActionTypes {
    return {
        type: UPDATE_TM,
        exercise: exercise,
        trainingMax: trainingMax
    }
}