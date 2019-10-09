import createSets from "./SetFactory"
import { ISetPrototype, IWorkoutPrototype, IVolumeSettings } from '../types';
import { Exercise } from "./Exercises";
import WorkoutFactory from "./WorkoutFactory";
import { IMainExercisesState } from '../reducers/mainExercises';
import { ISetProtoConfig } from '../reducers/setProtoConfig';
import WarmupGen from './WarmupGen';
import PlateCalculator from "../util/PlateCalculator";
import { SetGroupProps } from '../components/WorkoutSetTable';


interface PhaseFactoryCtx {
    unit: string
    setProtoConfig: ISetProtoConfig
    volumeSettings: IVolumeSettings
    mainExercises: IMainExercisesState
    warmupGen: WarmupGen
    plateCalculator: PlateCalculator
    workoutDays: IWorkoutPrototype[]
}


export default class PhaseFactory {
    ctx: PhaseFactoryCtx
    constructor(ctx: PhaseFactoryCtx) {
        this.ctx = ctx
    }

    getPhases(): SetGroupProps[] {
        const unit = this.ctx.unit
        const mainExercises = this.ctx.mainExercises
        const setProtosByPhase: ISetPrototype[][] = createSets(
            this.ctx.setProtoConfig,
            this.ctx.volumeSettings
        )
        const warmupGen = this.ctx.warmupGen
        const plateCalculator = this.ctx.plateCalculator
        const workoutDays = this.ctx.workoutDays

        const createWorkoutsForPhase = function (
            phaseNum: number,
            phaseSetProtos: ISetPrototype[],
            phaseWorkouts: IWorkoutPrototype[],
        ) {
            return phaseWorkouts.map(
                (workoutProto, i) => {
                    const exerciseInstances: Exercise[] = workoutProto.exerciseNames.map(
                        name => (mainExercises[name] as Exercise)
                    )

                    return new WorkoutFactory(
                        {
                            number: i + 1,
                            phase: phaseNum,
                            unit: unit,

                            // Workout combines the main Exercise instances with the set/rep/intensity schemes to build sets
                            mainLifts: exerciseInstances,
                            setProtos: phaseSetProtos,

                            // Warmupgen builds warmup sets for *just* the main exercises
                            warmupGen: warmupGen,
                            plateCalculator: plateCalculator,

                            // These are just raw sets tacked onto the end. This should be improved.
                            accessorySets: workoutProto.accessorySets,
                        }
                    )
                }
            )
        }

        return setProtosByPhase.flatMap((phaseSetProtos, i) => (
            createWorkoutsForPhase(i, phaseSetProtos, workoutDays)
                .map(workoutFactory => workoutFactory.getSetsAsWorkout())
        ))
    }
}