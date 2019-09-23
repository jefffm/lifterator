import React, { Component, ReactNode } from 'react'
import { ITrainingMaxes } from './Types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'


interface IFormProps {
    trainingMaxes: ITrainingMaxes
    handleChange: (event: any, key: string) => void
}

export class TrainingMaxesForm extends Component<IFormProps> {
    render(): ReactNode {
        const changeHandler = this.props.handleChange

        var elems = []
        const it = Object.entries(this.props.trainingMaxes).entries()
        for (const [i, item] of it) {
            const [key, value] = item
            elems.push(<Row key={i}>
                <Col>
                    <label>{key}</label>
                </Col>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            name={key}
                            type="number"
                            value={value.toString()}
                            onChange={function (e: any) { return changeHandler(e, key) }} />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">lbs</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>)
        }
        return (
            <Container>
                <form>
                    {elems.map(x => x)}
                </form>
            </Container>
        );
    }
}

export default TrainingMaxesForm