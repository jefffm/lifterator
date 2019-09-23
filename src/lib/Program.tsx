import React, { Component, ReactNode } from 'react'
import Phase from './Phase'
import TrainingMaxesForm from './TrainingMaxesForm'
import { ITrainingMaxes } from './Types'

type ProgramProps = {
    name: string
}

interface IProgramState {
    trainingMaxes: ITrainingMaxes
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
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>, key: string) {
        const value = event.currentTarget.valueAsNumber
        this.setState(state => (state.trainingMaxes[key] = value, state))
    }

    render(): ReactNode {
        const programName = this.props.name
        var trainingMaxes = this.state.trainingMaxes

        // TODO: inject the intensityScheme instead of sending the key
        return <div className="program card">
            <div className="programInfo card">
                <div className="title">
                    <h1>{programName}</h1>
                </div>

                <div className="trainingMaxesForm">
                    <h3>
                        Training Maxes
                    </h3>
                    <TrainingMaxesForm trainingMaxes={trainingMaxes} handleChange={this.handleChange} />
                </div>
            </div>

            <div className="phaseContainer">
                <Phase number={1} intensityScheme="3s" trainingMaxes={trainingMaxes} />
                <Phase number={2} intensityScheme="5s" trainingMaxes={trainingMaxes} />
                <Phase number={3} intensityScheme="1s" trainingMaxes={trainingMaxes} />
            </div>
        </div>
    }
}