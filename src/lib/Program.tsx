import React, { Component, ReactNode } from 'react'
import Phase from './Phase'

type ProgramProps = {
    name: string
    // TODO: training maxes
}

export class Program extends Component<ProgramProps> {
    render(): ReactNode {
        return <div className="program">
            <Phase number={1} intensityScheme="3s" />
            <Phase number={2} intensityScheme="5s" />
            <Phase number={3} intensityScheme="1s" />
        </div>
    }
}