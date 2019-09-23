import React, { Component, ReactNode } from 'react'
import { ITrainingMaxes } from './Types';


interface IFormProps {
    trainingMaxes: ITrainingMaxes
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, key: string) => void
}

export class TrainingMaxesForm extends Component<IFormProps> {
    render(): ReactNode {
        const changeHandler = this.props.handleChange

        var elems = []
        const it = Object.entries(this.props.trainingMaxes).entries()
        for (const [i, item] of it) {
            const [key, value] = item
            elems.push(<div key={i}>
                <label>{key}</label>
                <input
                    name={key}
                    type="number"
                    value={value as number}
                    onChange={e => changeHandler(e, key)} />
            </div>)
        }
        return (
            <form>
                {elems.map(x => x)}
            </form>
        );
    }
}

export default TrainingMaxesForm