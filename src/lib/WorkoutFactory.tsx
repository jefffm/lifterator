import React from 'react'

import { Exercise } from "./Exercises";
import PlateCalculator from '../util/PlateCalculator';
import WarmupGen from './WarmupGen';
import { ISetPrototype, IAccessoryPrototype, SetType } from '../types';
import { isUndefined } from "util";
import { WorkoutSetProps } from '../components/WorkoutSetRow';
import { round5 } from "../util/Math";
import { SetGroupProps } from "../components/WorkoutSetTable";
import Workout from '../components/Workout';


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
    number: number
    phase: number
    mainLifts: Exercise[]
    plateCalculator: PlateCalculator
    warmupGen: WarmupGen
    setProtos: ISetPrototype[]
    unit: string
    accessorySets: IAccessoryPrototype[]

    constructor(ctx: IWorkoutFactoryContext) {
        this.number = ctx.number
        this.phase = ctx.phase
        this.mainLifts = ctx.mainLifts
        this.plateCalculator = ctx.plateCalculator
        this.warmupGen = ctx.warmupGen
        this.setProtos = ctx.setProtos
        this.unit = ctx.unit
        this.accessorySets = ctx.accessorySets
    }

    getMainSets(): SetGroupProps[] {
        const setProtos = this.setProtos
        const unit = this.unit
        const plateCalculator = this.plateCalculator
        const warmupGen = this.warmupGen

        return this.mainLifts
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
        const unit = this.unit
        const accessorySets = this.accessorySets

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

    getSets() {
        return this.getMainSets().concat(this.getAccessorySets())
    }

    getSetsAsWorkout() {
        return <Workout number={this.number} phase={this.phase} setGroupProps={this.getSets()} />
    }

    // TODO
    getSetsasWorkoutSummary() {

    }
}