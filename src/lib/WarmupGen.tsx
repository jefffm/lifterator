import { roundn } from "../util/Math";
import { Exercise } from './ExerciseProvider';
import { isUndefined } from "util";
import { IMainExercisesState } from '../reducers/mainExercises';

const DEFAULT_BASE_WEIGHT = 95

export type StaticSet = {
    reps: number
    weight: number
}

export abstract class WarmupGen {
    abstract getSets(exercise: string, trainingMax: number, firstSetWeight: number): StaticSet[]
}

/**
 * The Starting Strength Warmup
 *
 * 2×5 with just the bar
 * 1×5 with bar + 25% of weight to add
 * 1×3 with bar + 50% of weight to add
 * 1×2 with bar + 75% of weight to add
 * 3×5 at full working weight
 */
export class StartingStrengthWarmupGen extends WarmupGen {
    mainExercises: IMainExercisesState

    constructor(mainExercises: IMainExercisesState) {
        super()
        this.mainExercises = mainExercises
    }

    getSets(exercise: string, trainingMax: number, firstSetWeight: number): StaticSet[] {
        const getWeight = (pct: number): number => (
            45 + ((firstSetWeight - 45) * pct)
        )

        return [
            { "reps": 5, "weight": 45 },
            { "reps": 5, "weight": 45 },
            { "reps": 5, "weight": getWeight(0.25) },
            { "reps": 3, "weight": getWeight(0.50) },
            { "reps": 2, "weight": getWeight(0.75) },
        ]
    }

}

/**
 * This class implements the warmup from Beyond 531:
 *
 * * Bar set for 10 reps
 * * Starting at your first set's weight, work backwards at increments of 10%
 * of your TM down to a "base weight"
 *
 */
export class BeyondWarmupGen extends WarmupGen {
    mainExercises: IMainExercisesState

    constructor(mainExercises: IMainExercisesState) {
        super()
        this.mainExercises = mainExercises
    }

    getBaseWeight(exerciseName: string): number {
        const exercise = this.mainExercises[exerciseName]
        return isUndefined(exercise)
            ? DEFAULT_BASE_WEIGHT
            : (exercise as Exercise).warmupBaseWeight
    }

    getSets(exercise: string, trainingMax: number, firstSetWeight: number): StaticSet[] {
        const baseWeight = this.getBaseWeight(exercise)

        // Initialize with a bar set
        var sets: StaticSet[] = [{ "reps": 10, "weight": 45 }]

        // Step forward with 10% of your training max each set
        const step = trainingMax * 0.1

        // Ensure we're always rounding up the number of sets we need
        const padding = step / 2

        const weightDiff = firstSetWeight - baseWeight
        const additionalWarmupSetCount = (weightDiff + padding) / step

        if (additionalWarmupSetCount > 0) {
            const numSets = Math.floor(additionalWarmupSetCount)

            for (var i = numSets; i > 0; i--) {
                const nextWarmupWeight = roundn(firstSetWeight - (i * step), 2.5)

                sets.push({ "reps": 5, "weight": Math.max(nextWarmupWeight, baseWeight) })
            }
        }

        return sets
    }
}

export default WarmupGen