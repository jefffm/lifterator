import React, { Component, ReactNode } from 'react'
import { WorkoutSet, WorkoutSetProps } from './WorkoutSet'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'


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
        return <Col md={6}>
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <Table bordered hover size="sm">
                        <tbody>
                            {setElems}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card >
        </Col>
    }
}

export default SetGroup