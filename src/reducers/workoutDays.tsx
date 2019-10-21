import { IWorkoutPrototype, SetType } from '../types';

const assistanceA = [
    {
        exercise: "Kroc Row",
        sets: 1,
        reps: { "num": 20, "setType": SetType.ACCESSORY },
        weight: 70,
    },
    {
        exercise: "DB OHP",
        sets: 4,
        reps: { "num": 7, "setType": SetType.ACCESSORY },
        weight: 35,
    },
]

const assistanceB = [
    {
        exercise: "Dips",
        reps: { "num": 10, "setType": SetType.ACCESSORY },
        sets: 4,
        weight: 0,
    },
    {
        exercise: "Face Pull",
        reps: { "num": 15, "setType": SetType.ACCESSORY },
        sets: 4,
        weight: 32.3,
    },
]

const initialState: IWorkoutPrototype[] = [
    {
        // Day 1
        exerciseNames: [
            "Bench Press",
            "Barbell Row",
            "Squat",
        ],
        accessorySets: assistanceA,
    },
    // Day 2
    {
        exerciseNames: [
            "Overhead Press",
            "Chin Ups",
            "Deadlift",
        ],
        accessorySets: assistanceB,
    },
    {
        // Day 3
        exerciseNames: [
            "Bench Press",
            "Barbell Row",
            "Squat",
        ],
        accessorySets: assistanceA,
    },
    // Day 4
    {
        exerciseNames: [
            "Overhead Press",
            "Chin Ups",
            "Squat",
        ],
        accessorySets: assistanceB,
    },
    {
        // Day 5
        exerciseNames: [
            "Bench Press",
            "Barbell Row",
            "Deadlift",
        ],
        accessorySets: assistanceA,
    },
    // Day 6
    {
        exerciseNames: [
            "Overhead Press",
            "Chin Ups",
            "Squat",
        ],
        accessorySets: assistanceB,
    },
]

const workoutDays = (
    state: IWorkoutPrototype[] = initialState,
    action: any
): IWorkoutPrototype[] => {
    // TODO: append, update, delete, swap (reorder)
    return state
}

export default workoutDays