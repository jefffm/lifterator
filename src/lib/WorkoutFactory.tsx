import React from 'react'

import { Exercise } from "./ExerciseProvider";
import PlateCalculator from '../util/PlateCalculator';
import WarmupGen from './WarmupGen';
import { ISetPrototype, IAccessoryPrototype, SetType } from '../types';
import { isUndefined } from "util";
import { WorkoutSetProps } from '../components/WorkoutSetRow';
import { round5 } from "../util/Math";
import { SetGroupProps } from "../components/WorkoutSetTable";
import Workout from '../components/Workout';
import WorkoutSummary, { ExerciseSummary } from '../components/WorkoutSummary';


interface IWorkoutFactoryContext {
    number: number
    phase: number
    mainLifts: Exercise[]
    plateCalculator: PlateCalculator
    warmupGen: WarmupGen
    setProtos: ISetPrototype[]
    unit: string
    accessorySets: IAccessoryPrototype[]
}


export default class WorkoutFactory {
    ctx: IWorkoutFactoryContext

    constructor(ctx: IWorkoutFactoryContext) {
        this.ctx = ctx
    }

    getMainSets = (): SetGroupProps[] => {
        const unit = this.ctx.unit
        const plateCalculator = this.ctx.plateCalculator
        const warmupGen = this.ctx.warmupGen
        const setProtos = this.ctx.setProtos

        return this.ctx.mainLifts
            .filter(x => !isUndefined(x.trainingMax))
            .map(
                function (lift): SetGroupProps {
                    const trainingMax = lift.trainingMax as number

                    const sets = setProtos.map(
                        function (setProto: ISetPrototype): WorkoutSetProps {
                            const setReps = setProto.reps
                            const setWeight = round5(
                                trainingMax * setProto.intensityPct
                            )
                            return {
                                isNext: false,
                                exercise: lift.shortname,
                                reps: setReps,
                                weight: setWeight,
                                unit: unit,
                                plates: plateCalculator.getPlatesPerSide(setWeight)
                            }
                        }
                    )

                    const warmupSets = warmupGen.getSets(lift.name, trainingMax, sets[0].weight)
                        .map(function (set): WorkoutSetProps {
                            return {
                                isNext: false,
                                exercise: lift.shortname,
                                reps: { "num": set.reps, "setType": SetType.WARMUP },
                                weight: set.weight,
                                unit: unit,
                                plates: plateCalculator.getPlatesPerSide(set.weight)
                            }
                        })

                    return {
                        name: lift.name,
                        sets: warmupSets.concat(sets),
                        unit: unit
                    }
                }
            )
    }

    getAccessorySets(): SetGroupProps[] {
        const unit = this.ctx.unit
        const accessorySets = this.ctx.accessorySets

        const createAccessoryFromProto = function (accessory: IAccessoryPrototype): WorkoutSetProps[] {
            var sets = []
            for (var i = 0; i < accessory.sets; i++) {
                sets.push(
                    {
                        exercise: accessory.exercise,
                        reps: accessory.reps,
                        weight: accessory.weight,
                        unit: unit,
                    }
                )
            }
            return sets
        }

        // TODO: send the accessory sets grouped by exercise, rather than as a list
        return accessorySets
            .map(createAccessoryFromProto)
            .map(
                workoutSets => (
                    { name: workoutSets[0].exercise, sets: workoutSets, unit: unit }
                )
            )

    }

    getSetGroups(): SetGroupProps[] {
        return this.getMainSets().concat(this.getAccessorySets())
    }

    /**
     * For each set in the setgroup, accumulate the setgroup's total volume
     */
    getSetGroupVolume = (set: SetGroupProps): number => (
        set.sets.reduce(
            (acc: number, current: WorkoutSetProps) => {
                // TODO: if this is a dumbell exercise, double the volume!
                const result = acc + (current.reps.num * current.weight)
                if (isNaN(result)) {
                    console.log(
                        {
                            acc: acc,
                            reps: current.reps.num,
                            weight: current.weight
                        }
                    )
                }
                return result
            },
            0
        )
    )

    getSetGroupSetCount = (set: SetGroupProps): number => set.sets.length

    getWorkoutVolume = (): number => this.getSetGroups()
        .reduce((acc, setGroup) => acc + this.getSetGroupVolume(setGroup), 0)

    getWorkoutSetCount = (): number => this.getSetGroups()
        .reduce((acc, setGroup) => acc + this.getSetGroupSetCount(setGroup), 0)

    getKey = (): string => (
        this.ctx.phase.toString() + this.ctx.number.toString()
    )

    getSetsAsWorkout = (): JSX.Element => (
        <Workout
            key={this.getKey()}
            number={this.ctx.number}
            phase={this.ctx.phase}
            setGroupProps={this.getSetGroups()} />
    )

    getSetsasWorkoutSummary = (): JSX.Element => (
        <WorkoutSummary
            key={this.getKey()}
            phaseNum={this.ctx.phase}
            workoutNum={this.ctx.number}
            setCount={this.getWorkoutSetCount()}
            volume={this.getWorkoutVolume()}
            unit={this.ctx.unit}
            exerciseSummaryComponents={
                this.getSetGroups().map(
                    setGroup => (
                        <ExerciseSummary
                            name={setGroup.name}
                            topPct={0}
                            topWeight={
                                setGroup.sets.reduce(
                                    (acc, set) => (
                                        Math.max(acc, set.weight)
                                    ), 0
                                )
                            }
                            setCount={this.getSetGroupSetCount(setGroup)}
                            volume={this.getSetGroupVolume(setGroup)}
                            unit={this.ctx.unit}
                        />
                    )
                )
            }
        />
    )
}