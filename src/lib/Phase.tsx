import React, { Component, ReactNode } from 'react'
import Workout from './Workout'
import { IExerciseWeightMapping, ISetPrototype } from './Types'
import PlateCalculator from '../util/PlateCalculator'
import { WarmupGen } from './WarmupGen'

import Grid from '@material-ui/core/Grid'


// TODO: receive training maxes
type PhaseProps = {
    number: number
    trainingMaxes: IExerciseWeightMapping
    plateCalculator: PlateCalculator
    warmupGen: WarmupGen
    setProtos: ISetPrototype[]
    unit: string
}

export class Phase extends Component<PhaseProps> {
    render(): ReactNode {
        const number = this.props.number
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator
        const warmupGen = this.props.warmupGen
        const setProtos = this.props.setProtos
        const unit = this.props.unit

        // TODO: Add configuration for number of days and splits (eg. 4 day vs. 2 day)
        return <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="stretch">
            <Workout
                number={1}
                phase={number}
                mainLifts={["Squat", "Bench Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                warmupGen={warmupGen}
                setProtos={setProtos}
                unit={unit}
            />
            <Workout
                number={2}
                phase={number}
                mainLifts={["Deadlift", "Overhead Press"]}
                trainingMaxes={trainingMaxes}
                plateCalculator={plateCalculator}
                warmupGen={warmupGen}
                setProtos={setProtos}
                unit={unit}
            />
        </Grid >
    }
}

export default Phase