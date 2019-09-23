import React, { Component, ReactNode } from 'react'
import SetGroup from './SetGroup';
import IntensityScheme, { INTENSITY_SCHEME_DATA } from './Types'
import { round5 } from '../Util';

type WorkoutProps = {
    number: number
    intensityScheme: IntensityScheme
    mainLifts: string[]
    trainingMaxes: object
};

export class Workout extends Component<WorkoutProps> {
    render(): ReactNode {
        const number = this.props.number
        const intensitySchemeKey = this.props.intensityScheme
        const mainLiftSetIntensities = INTENSITY_SCHEME_DATA[intensitySchemeKey]
        const mainLifts = this.props.mainLifts
        const trainingMaxes = this.props.trainingMaxes

        return <div className="card">
            <h3>Workout {number}</h3>
            {
                mainLifts.map(
                    function (lift) {
                        const exerciseTrainingMax = (trainingMaxes as any)[lift]
                        const sets = mainLiftSetIntensities.map(
                            function (setIntensity) {
                                const setWeight = round5(exerciseTrainingMax * setIntensity)
                                return {
                                    "exercise": lift,
                                    "reps": 5,  // TODO: pass in the rep scheme
                                    "weight": setWeight
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