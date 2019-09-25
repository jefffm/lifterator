import React, { Component, ReactNode } from 'react'
import IExerciseWeightMapping from './Types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'


interface IFormProps {
    trainingMaxes: IExerciseWeightMapping
    handleChange: (event: any, key: string) => void
    unit: string
    validated: boolean
}

interface IFormState {
    open: boolean
}

export class TrainingMaxesForm extends Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props)
        this.state = { open: true }
    }

    render(): ReactNode {
        const changeHandler = this.props.handleChange
        const unit = this.props.unit
        const validated = this.props.validated
        const open = this.state.open

        var elems = []
        const it = Object.entries(this.props.trainingMaxes).entries()
        for (const [i, item] of it) {
            const [key, value] = item
            elems.push(<Form.Group as={Row} controlId={key}>
                <Form.Label column sm="6">{key}</Form.Label>
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            name={key}
                            type="number"
                            placeholder="1rm * 0.9"
                            onChange={function (e: any) { return changeHandler(e, key) }} />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">{unit}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Form.Group>
            )
        }
        return (
            <Container>
                <Col>
                    <Button
                        onClick={() => this.setState({ open: !open })}
                        aria-controls="example-collapse-text"
                        aria-expanded={open} >
                        Toggle Config
                    </Button>
                </Col>

                <Col>
                    <Collapse in={open}>
                        <Form validated={validated}>
                            {elems}
                        </Form>
                    </Collapse>
                </Col>
            </Container>
        );
    }
}

export default TrainingMaxesForm