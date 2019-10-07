import { IWorkoutPrototype, SetType } from '../types';

const initialState: IWorkoutPrototype[] = [
    {
        // Day 1
        exerciseNames: [
            "Squat",
            "Bench Press"
        ],
        accessorySets: [
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
    },
    // Day 2
    {
        exerciseNames: [
            "Deadlift",
            "Overhead Press"
        ],
        accessorySets: [
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
    }
]

const workoutDays = (
    state: IWorkoutPrototype[] = initialState,
    action: any
): IWorkoutPrototype[] => {
    // TODO: append, update, delete, swap (reorder)
    return state
}

export default workoutDays