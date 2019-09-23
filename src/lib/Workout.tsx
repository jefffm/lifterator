import React, { Component, ReactNode } from 'react'
import SetGroup from './SetGroup';
import { round5 } from '../util/Math';
import PlateCalculator from '../util/PlateCalculator';
import { ISetPrototype } from './Types';

type WorkoutProps = {
    number: number
    mainLifts: string[]
    trainingMaxes: object
    plateCalculator: PlateCalculator
    setProtos: ISetPrototype[]
};

export class Workout extends Component<WorkoutProps> {
    render(): ReactNode {
        const number = this.props.number
        const setProtos = this.props.setProtos
        const mainLifts = this.props.mainLifts
        const trainingMaxes = this.props.trainingMaxes
        const plateCalculator = this.props.plateCalculator

        return <div className="card">
            <h3>Workout {number}</h3>
            {
                mainLifts.map(
                    function (lift) {
                        const exerciseTrainingMax = (trainingMaxes as any)[lift]
                        const sets = setProtos.map(
                            function (setProto: ISetPrototype) {
                                const setReps = setProto.reps
                                const setWeight = round5(exerciseTrainingMax * setProto.intensityPct)
                                return {
                                    "exercise": lift,
                                    "reps": setReps.num,
                                    "weight": setWeight,
                                    "plates": plateCalculator.getPlatesPerSide(setWeight)
                                }
                            }
                        )

                        return <SetGroup key={lift} name={lift} sets={sets} />
                    }

                )
            }
            <SetGroup name="Accessories" sets={[]} />
        </div>
    }
}

export default Workout