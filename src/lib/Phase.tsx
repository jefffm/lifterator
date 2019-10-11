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
        const plateCalculator = this.ctx.plateCalculator
        const intensityRepScheme = this.ctx.intensityRepScheme

        var setProtos: ISetPrototype[] = []
        for (var i = 0; i < intensityRepScheme.length; i++) {
            setProtos.push(
                {
                    intensityPct: intensityRepScheme[i][0] as number,
                    reps: intensityRepScheme[i][1] as Reps
                }
            )
        }

        return new WorkoutFactory(
            {
                number: workoutNum + 1,
                phase: phaseNum,
                unit: this.ctx.unit,

                // Workout combines the main Exercise instances with the set/rep/intensity schemes to build sets
                mainLifts: exerciseInstances,
                setProtos: setProtos,

                // Warmupgen builds warmup sets for *just* the main exercises
                warmupGen: warmupGen,
                plateCalculator: plateCalculator,

                // These are just raw sets tacked onto the end. This should be improved.
                accessorySets: workoutProto.accessorySets,
            }
        )
    }
}
