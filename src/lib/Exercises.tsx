export type IExerciseWeightMapping = {
    [exercise: string]: number
}

export interface Exercise {
    name: string
    shortname: string
    aliases: string[]
}

type ExerciseMapFunction = (exerciseName: string) => Exercise

const UNDEFINED_EXERCISE: Exercise = {
    name: "Undefined",
    shortname: "UNDEF",
    aliases: []
}

export default function NameExerciseMapper(exercises: Exercise[]): ExerciseMapFunction {
    const nameExercisePairs: [string, Exercise][] = exercises.flatMap(exercise => {
        const allNames = [exercise.name, exercise.shortname].concat(exercise.aliases)
        return allNames.map((name: string): [string, Exercise] => [name.toLowerCase(), exercise])
    })

    const nameToExercise = new Map(nameExercisePairs)

    return (exerciseName) => nameToExercise.get(exerciseName.toLowerCase()) || UNDEFINED_EXERCISE
}