import React, { Component, ReactNode } from 'react'
import Phase from './Phase'
import TrainingMaxesForm from './TrainingMaxesForm'
import { ITrainingMaxes, INTENSITY_SCHEME_DATA, REPETITIONS_SCHEME_DATA, ISetPrototype, Reps } from './Types'
import PlateCalculator, { IAvailablePlates } from '../util/PlateCalculator'

type ProgramProps = {
    name: string
}

interface IProgramState {
    trainingMaxes: ITrainingMaxes
    availablePlates: IAvailablePlates
    barWeight: number
}

export class Program extends Component<ProgramProps, IProgramState> {
    constructor(props: ProgramProps) {
        super(props)

        this.state = {
            "trainingMaxes": {
                "Squat": 150,
                "Bench Press": 155,
                "Deadlift": 190,
                "Overhead Press": 105
            },
            "availablePlates": {
                45: 4,
                25: 3,
                10: 2,
                5: 1,
                2.5: 1
            },
            "barWeight": 45
        }

        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(event: React.FormEvent<HTMLInputElement>, key: string) {
        const value = event.currentTarget.valueAsNumber
        // eslint-disable-next-line
        this.setState(state => (state.trainingMaxes[key] = value, state))
    }

    render(): ReactNode {
        const programName = this.props.name
        var trainingMaxes = this.state.trainingMaxes
        const plateCalculator = new PlateCalculator({ availablePlates: this.state.availablePlates, barWeight: this.state.barWeight })

        // TODO: Add Set Prototype configuration to the program form configuration
        const setProtoConfig = [
            [INTENSITY_SCHEME_DATA["3s"], REPETITIONS_SCHEME_DATA["5s pro"]],
            [INTENSITY_SCHEME_DATA["5s"], REPETITIONS_SCHEME_DATA["5s pro"]],
            [INTENSITY_SCHEME_DATA["1s"], REPETITIONS_SCHEME_DATA["5s pro"]]
        ]

        var setProtosByPhase: ISetPrototype[][] = []
        for (const [intensitySets, repSets] of setProtoConfig) {
            var setList: ISetPrototype[] = []
            for (const [setNum, intensityPct] of intensitySets.entries()) {
                setList.push(
                    {
                        "intensityPct": intensityPct as number,
                        "reps": repSets[setNum] as Reps
                    }
                )
            }
            setProtosByPhase.push(setList)
        }

        // TODO: inject the intensityScheme instead of sending the key
        return <div className="program card">
            <div className="programInfo card">
                <div className="title">
                    {programName}
                </div>

                <div className="trainingMaxesForm">
                    <h3>
                        Training Maxes
                    </h3>
                    <TrainingMaxesForm trainingMaxes={trainingMaxes} handleChange={this.handleChange} />
                </div>
            </div>

            <div className="phaseContainer">
                {
                    setProtosByPhase.map(function (setProtos: ISetPrototype[], i) {
                        return <Phase
                            number={i}
                            trainingMaxes={trainingMaxes}
                            plateCalculator={plateCalculator}
                            setProtos={setProtos}
                        />
                    })
                }
            </div>
        </div >
    }
}