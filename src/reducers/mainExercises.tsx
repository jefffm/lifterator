import { MainExerciseActionTypes, UPDATE_TM } from '../types';
import { Exercise } from '../lib/Exercises';


export interface IMainExercisesState {
    [key: string]: Exercise
}

// TODO: support aliases
const initialState = [
    {
        name: "Bench Press",
        shortname: "BP",
        aliases: ["bps", "bench", "horizontal press"],
        trainingMax: undefined,
        warmupBaseWeight: 95
    },
    {
        name: "Deadlift",
        shortname: "DL",
        aliases: ["dead", "deads", "dls"],
        trainingMax: undefined,
        warmupBaseWeight: 135
    },
    {
        name: "Overhead Press",
        shortname: "OHP",
        aliases: ["press", "military press"],
        trainingMax: undefined,
        warmupBaseWeight: 95
    },
    {
        name: "Squat",
        shortname: "SQ",
        aliases: ["back squat"],
        trainingMax: undefined,
        warmupBaseWeight: 135
    }
].reduce((acc: IMainExercisesState, exercise: Exercise) => {
    acc[exercise.name] = exercise
    return acc
}, {})

const mainExercises = (
    state = initialState,
    action: MainExerciseActionTypes
): IMainExercisesState => {

    switch (action.type) {
        case UPDATE_TM:
            const exerciseKey: string = action.exercise.name
            return {
                ...state,
                [exerciseKey]: {
                    ...state[exerciseKey] as Exercise,
                    trainingMax: action.trainingMax
                }
            }
        default:
            return state
    }
}

export default mainExercises