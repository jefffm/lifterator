import { isUndefined } from "util"
import { OnChangeHandlerFunction } from "./Types"

export type IExerciseWeightMapping = {
    [exercise: string]: number
}

export interface Exercise {
    name: string
    shortname: string
    aliases: string[]
    trainingMax: number | undefined
    warmupBaseWeight: number
}

const UNDEFINED_EXERCISE: Exercise = {
    name: "Undefined",
    shortname: "UNDEF",
    aliases: [],
    trainingMax: undefined,
    warmupBaseWeight: 0,
}

export interface ExerciseWithHandler {
    exercise: Exercise
    onChangeHandler: OnChangeHandlerFunction
}

// TODO: Can ExerciseProvider somehow bind onChange handlers to each item in the Program state array...?
export default class ExerciseProvider {
    exercises: Exercise[]
    nameToExercise: Map<string, ExerciseWithHandler>

    constructor(exercises: Exercise[], onChangeHandlerFactory: (i: number, exercise: Exercise) => OnChangeHandlerFunction) {
        this.exercises = exercises

        const nameExercisePairs = exercises.flatMap(
            (exercise: Exercise, i: number) => {
                const allNames = [exercise.name, exercise.shortname].concat(exercise.aliases)
                return allNames.map(
                    (name: string): [string, ExerciseWithHandler] => [
                        name.toLowerCase(), {
                            onChangeHandler: onChangeHandlerFactory(i, exercise), exercise: exercise
                        }
                    ]
                )
            })

        this.nameToExercise = new Map(nameExercisePairs)
    }

    filterWithTms(): Exercise[] {
        return this.exercises.filter(x => !isUndefined(x.trainingMax))
    }


    get(exerciseName: string): ExerciseWithHandler | undefined {
        return this.nameToExercise.get(exerciseName.toLowerCase())
    }
}