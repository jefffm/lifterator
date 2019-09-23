import React, { Component, ReactNode } from 'react'
import { WorkoutSet, WorkoutSetProps } from './WorkoutSet'


type SetGroupProps = {
    name: string
    sets: WorkoutSetProps[]
};

export class SetGroup extends Component<SetGroupProps> {
    render(): ReactNode {
        const name = this.props.name
        const sets = this.props.sets

        // TODO: generate warmup sets with beyond method

        var setElems = []
        for (const [i, item] of sets.entries()) {
            const key = name + item.exercise + item.reps + item.weight
            setElems.push(<WorkoutSet
                key={i}
                exercise={item.exercise}
                reps={item.reps}
                weight={item.weight} />)
        }
        return <div className="card workout">
            <h3>{name}</h3>
            <table>
                <tbody>
                    {
                        setElems.map(x => x)
                    }
                </tbody>
            </table>
        </div>
    }
}

export default SetGroup