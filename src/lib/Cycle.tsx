import createSets from "./SetFactory"
import { ISetPrototype, IWorkoutPrototype, IVolumeSettings } from '../types';
import { Exercise } from "./Exercises";
import WorkoutFactory from './WorkoutFactory';
import { IMainExercisesState } from '../reducers/mainExercises';
import { ISetProtoConfig } from '../reducers/setProtoConfig';
import WarmupGen from './WarmupGen';
import PlateCalculator from "../util/PlateCalculator";
import { isUndefined } from "util";


interface CycleCtx {
    unit: string
    setProtoConfig: ISetProtoConfig
    volumeSettings: IVolumeSettings
    mainExercises: IMainExercisesState
    warmupGen: WarmupGen
    plateCalculator: PlateCalculator
    workoutPrototypes: IWorkoutPrototype[]
}


export default class Cycle {
    ctx: CycleCtx
    constructor(ctx: CycleCtx) {
        this.ctx = ctx
    }

    getExerciseFromName = (name: string): Exercise => {
        const exercise = this.ctx.mainExercises[name]
        if (isUndefined(exercise)) {
            console.error("Exercise " + name + " not found in main exercises!")
        }

        return exercise as Exercise
    }

    getWorkoutFactory = (
        phaseNum: number,
        workoutNum: number,
        workoutProto: IWorkoutPrototype,
        phaseSetProtos: ISetPrototype[],
    ): WorkoutFactory => {
        const exerciseInstances: Exercise[] = workoutProto.exerciseNames
            .map(this.getExerciseFromName)
        const warmupGen = this.ctx.warmupGen
        const plateCalculator = this.ctx.plateCalculator

        return new WorkoutFactory(
            {
                number: workoutNum + 1,
                phase: phaseNum,
                unit: this.ctx.unit,

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

    createWorkoutsForPhase = (
        phaseNum: number,
        phaseSetProtos: ISetPrototype[],
        workoutPrototypes: IWorkoutPrototype[],
    ): WorkoutFactory[] => {
        return workoutPrototypes.map(
            (workoutProto, workoutNum) => (
                this.getWorkoutFactory(
                    phaseNum, workoutNum, workoutProto, phaseSetProtos
                )
            )
        )
    }

    getPhases(): JSX.Element[] {
        const setProtosByPhase: ISetPrototype[][] = createSets(
            this.ctx.setProtoConfig,
            this.ctx.volumeSettings
        )
        const workoutPrototypes = this.ctx.workoutPrototypes

        return setProtosByPhase.flatMap((phaseSetProtos, i) => (
            this.createWorkoutsForPhase(i, phaseSetProtos, workoutPrototypes)
                .map(workoutFactory => workoutFactory.getSetsAsWorkout())
        ))
    }
}