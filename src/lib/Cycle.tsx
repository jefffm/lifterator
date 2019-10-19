import { IWorkoutPrototype, IVolumeSettings } from '../types';
import WorkoutFactory from './WorkoutFactory';
import WarmupGen from './WarmupGen';
import PlateCalculator from "../util/PlateCalculator";
import Phase from './Phase';
import { IntensityRepScheme } from '../reducers/PhaseIntensityRepSchemes';
import ExerciseProvider from './ExerciseProvider';


interface CycleCtx {
    exerciseProvider: ExerciseProvider
    phaseIntensityRepSchemes: IntensityRepScheme[]
    workoutPrototypes: IWorkoutPrototype[]
    volumeSettings: IVolumeSettings
    warmupGen: WarmupGen
    plateCalculator: PlateCalculator  // TODO: move to a presentational component
    unit: string  // TODO: move to a presentational component
}


/**
 * cycle -> phase -> workout -> setgroup -> set -> exercise/rep/weight (via intensity or static)
 *
 * For each phase of the intensity/rep schemes, (list of each phase's intensity/rep scheme)
 *   create a phase.
 *   for each phase...
 *     create a workout for each workout prototype (list of each workout's prototype [eg. exercises])
 *      ...which requires a warmupGen and a volumeSettings
 */
export default class Cycle {
    ctx: CycleCtx
    phases: Phase[]

    constructor(ctx: CycleCtx) {
        this.ctx = ctx

        this.phases = ctx.phaseIntensityRepSchemes.map(
            (scheme, i) => (
                new Phase(
                    {
                        phaseNum: i,
                        workoutPrototypes: ctx.workoutPrototypes,
                        intensityRepScheme: scheme,
                        warmupGen: ctx.warmupGen,
                        volumeSettings: ctx.volumeSettings,
                        exerciseProvider: ctx.exerciseProvider,
                        plateCalculator: ctx.plateCalculator,
                        unit: ctx.unit,
                    }
                )
            )
        )
    }

    getWorkout(phaseNum: number, workoutNum: number): WorkoutFactory {
        const phase = this.phases[phaseNum]
        return phase.getWorkoutFactories()[workoutNum]
    }

    getWorkouts(): WorkoutFactory[] {
        return this.phases.flatMap(phase => phase.getWorkoutFactories())
    }
}