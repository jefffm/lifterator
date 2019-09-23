import React, { Component, ReactNode } from 'react'
import Phase from './Phase'
import TrainingMaxesForm from './TrainingMaxesForm'
import { ITrainingMaxes } from './Types'
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
                <Phase number={1} intensityScheme="3s" trainingMaxes={trainingMaxes} plateCalculator={plateCalculator} />
                <Phase number={2} intensityScheme="5s" trainingMaxes={trainingMaxes} plateCalculator={plateCalculator} />
                <Phase number={3} intensityScheme="1s" trainingMaxes={trainingMaxes} plateCalculator={plateCalculator} />
            </div>
        </div>
    }
}