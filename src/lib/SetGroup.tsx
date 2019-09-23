import React, { Component, ReactNode } from 'react'
import { WorkoutSet, WorkoutSetProps } from './WorkoutSet'
import Table from 'react-bootstrap/Table'


type SetGroupProps = {
    name: string
    sets: WorkoutSetProps[]
};

export class SetGroup extends Component<SetGroupProps> {
    render(): ReactNode {
        const name = this.props.name
        const sets = this.props.sets

        // TODO: generate warmup sets with "Beyond 531" method
        var setElems = []
        for (const [i, item] of sets.entries()) {
            setElems.push(<WorkoutSet
                key={i}
                exercise={item.exercise}
                reps={item.reps}
                weight={item.weight}
                plates={item.plates}
            />)
        }
        return <div className="card workout">
            <h3>{name}</h3>
            <Table striped bordered hover>
                <tbody>
                    {setElems}
                </tbody>
            </Table>
        </div>
    }
}

export default SetGroup