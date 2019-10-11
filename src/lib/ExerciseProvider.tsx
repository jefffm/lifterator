import { isUndefined } from "util"

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

/**
 * Parses all configured exercises and maps arbitrary strings to Exercise instances
 */
export default class ExerciseProvider {
    exercises: Exercise[]
    nameToExercise: Map<string, Exercise>

    constructor(exercises: Exercise[]) {
        this.exercises = exercises

        const nameExercisePairs = exercises.flatMap(
            (exercise: Exercise) => {
                const allNames = [exercise.name, exercise.shortname].concat(exercise.aliases)
                return allNames.map(
                    (name: string): [string, Exercise] => [
                        name.toLowerCase(), exercise
                    ]
                )
            })

        this.nameToExercise = new Map(nameExercisePairs)
    }

    filterWithTms = (): Exercise[] => {
        return this.exercises.filter(x => !isUndefined(x.trainingMax))
    }

    get = (exerciseName: string): Exercise => {
        return this.nameToExercise.get(exerciseName.toLowerCase()) || UNDEFINED_EXERCISE
    }
}