/**
 * Defines the intensity presets we can build sets with
 * 
 * To build a set, we need to zip up an intensity scheme with a repetition
 * scheme.
 * 
 * A given intensity scheme needs to have the same length as the rep scheme
 * it's zipped with when building a set.
 * 
 * TODO: Figure out how to remove the implicit coupling between intensity and rep schemes
 */
export const INTENSITY_SCHEME_DATA = {
    '5s': [0.65, 0.75, 0.85],
    '3s': [0.70, 0.80, 0.90],
    '1s': [0.75, 0.85, 0.95],
    'deload': [0.4, 0.5, 0.6],
    'tm-test': [0.7, 0.8, 0.9, 1]
}

export type SetType = 'normal' | 'amrap' | 'joker'

export interface Reps {
    num: number
    setType: SetType
}

export interface ISetPrototype {
    intensityPct: number
    reps: Reps
}

export interface IRepetitionSchemeData {
    [repetitionScheme: string]: Reps[]
}

/**
 * Defines the repetitions and set type to use for a series of sets.
 */
export const REPETITIONS_SCHEME_DATA: IRepetitionSchemeData = {
    // 5s pro can also be used for deload
    '5s pro': [
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'normal' },
    ],
    '5s': [
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'amrap' },
    ],
    '3s': [
        { num: 3, setType: 'normal' },
        { num: 3, setType: 'normal' },
        { num: 3, setType: 'amrap' },
    ],
    '1s': [
        { num: 5, setType: 'normal' },
        { num: 3, setType: 'normal' },
        { num: 1, setType: 'amrap' },
    ],
    'tm-test': [
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'normal' },
        { num: 5, setType: 'normal' },
        { num: 3, setType: 'amrap' },
    ]
}

export interface IExerciseWeightMapping {
    [exercise: string]: number | undefined
}

export default IExerciseWeightMapping;