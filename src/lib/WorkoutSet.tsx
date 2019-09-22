import React from 'react'; // we need this to make JSX compile

// TODO: plate calculator
type WorkoutSetProps = {
    exercise: string
    reps: number
    weight: number
}

export const WorkoutSet = ({ exercise, reps, weight }: WorkoutSetProps) => <tr>
    <td>{exercise}</td>
    <td>{reps}x</td>
    <td>{weight} lbs</td>
</tr>

export default WorkoutSet