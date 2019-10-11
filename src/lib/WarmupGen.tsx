import { round5 } from "../util/Math";
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
        var sets: StaticSet[] = [
            {
                "reps": 10,
                "weight": 45
            }
        ]

        // Step forward with 10% of your training max each set
        const step = trainingMax * 0.1

        // Ensure we're always rounding up the number of sets we need
        const padding = step / 2

        const weightDiff = firstSetWeight - baseWeight
        const additionalWarmupSetCount = (weightDiff + padding) / step

        if (additionalWarmupSetCount > 0) {
            const numSets = Math.floor(additionalWarmupSetCount)

            for (var i = numSets; i > 0; i--) {
                const nextWarmupWeight = round5(firstSetWeight - (i * step))

                sets.push(
                    {
                        "reps": 5,
                        "weight": nextWarmupWeight
                    }
                )
            }
        }

        return sets
    }
}

export default WarmupGen