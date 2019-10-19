import { IntensityRepScheme } from '../reducers/PhaseIntensityRepSchemes';
import { IVolumeSettings, IWorkoutPrototype, ISetPrototype, Reps } from '../types';
import WarmupGen from './WarmupGen';
import WorkoutFactory from './WorkoutFactory';
import ExerciseProvider, { Exercise } from './ExerciseProvider';
import PlateCalculator from '../util/PlateCalculator';


interface PhaseCtx {
    phaseNum: number,
    workoutPrototypes: IWorkoutPrototype[]
    intensityRepScheme: IntensityRepScheme
    warmupGen: WarmupGen
    volumeSettings: IVolumeSettings
    exerciseProvider: ExerciseProvider
    plateCalculator: PlateCalculator
    unit: string
}

export default class Phase {
    ctx: PhaseCtx
    constructor(ctx: PhaseCtx) {
        this.ctx = ctx
    }

    /**
     * For each workout prototype, create a workout using this phase's
     * intensity/rep scheme.
     */
    getWorkoutFactories = (): WorkoutFactory[] => {
        return this.ctx.workoutPrototypes.map(
            (workoutProto, workoutNum) => (
                this.getWorkoutFactory(this.ctx.phaseNum, workoutNum, workoutProto)
            )
        )
    }

    getWorkoutFactory = (
        phaseNum: number,
        workoutNum: number,
        workoutProto: IWorkoutPrototype,
    ): WorkoutFactory => {
        const exerciseInstances: Exercise[] = workoutProto.exerciseNames
            .map(this.ctx.exerciseProvider.get)
        const warmupGen = this.ctx.warmupGen
        const volumeSettings = this.ctx.volumeSettings
        const plateCalculator = this.ctx.plateCalculator
        const intensityRepScheme = this.ctx.intensityRepScheme

        var setProtos: ISetPrototype[] = []
        const intensityPcts = intensityRepScheme[0]
        const setReps = intensityRepScheme[1]

        for (const [i, intensityPct] of intensityPcts.entries()) {
            setProtos.push(
                {
                    intensityPct: intensityPct as number,
                    reps: setReps[i] as Reps
                }
            )
        }

        return new WorkoutFactory(
            {
                number: workoutNum,
                phase: phaseNum,
                unit: this.ctx.unit,

                // Workout combines the main Exercise instances with the set/rep/intensity schemes to build sets
                mainLifts: exerciseInstances,
                setProtos: setProtos,

                // Warmupgen builds warmup sets for *just* the main exercises
                warmupGen: warmupGen,
                volumeSettings: volumeSettings,
                plateCalculator: plateCalculator,

                // These are just raw sets tacked onto the end. This should be improved.
                accessorySets: workoutProto.accessorySets,
            }
        )
    }
}
