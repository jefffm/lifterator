import { MainExerciseActionTypes, UPDATE_TM } from '../types';
import { Exercise } from '../lib/Exercises';

const initialState: Map<string, Exercise> = function () {
    const exercises = [
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
    ]

    return new Map(exercises.map(e => [e.name, e]))
}()

const mainExercises = (
    state: Map<string, Exercise> = initialState,
    action: MainExerciseActionTypes
): Map<string, Exercise> => {

    switch (action.type) {
        case UPDATE_TM:
            const exerciseKey: string = action.exercise.name
            return {
                ...state,
                [exerciseKey]: {
                    ...state.get(exerciseKey) as Exercise,
                    trainingMax: action.trainingMax
                }
            }
        default:
            return state
    }
}

export default mainExercises