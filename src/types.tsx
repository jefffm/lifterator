import { Exercise } from "./lib/Exercises"

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

export enum SetType {
    NORMAL,
    AMRAP,
    JOKER,
    WARMUP,
    ACCESSORY
}

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
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.NORMAL },
    ],
    '5s': [
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.AMRAP },
    ],
    '3s': [
        { num: 3, setType: SetType.NORMAL },
        { num: 3, setType: SetType.NORMAL },
        { num: 3, setType: SetType.AMRAP },
    ],
    '1s': [
        { num: 5, setType: SetType.NORMAL },
        { num: 3, setType: SetType.NORMAL },
        { num: 1, setType: SetType.AMRAP },
    ],
    'tm-test': [
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.NORMAL },
        { num: 5, setType: SetType.NORMAL },
        { num: 3, setType: SetType.AMRAP },
    ]
}


export interface IVolumeSettings {
    [key: string]: any
    firstSetLastFives: boolean
    firstSetLastAmrap: boolean
}

export type OnChangeHandlerFunction = (event: React.ChangeEvent<any>) => void


export const UPDATE_TM = 'UPDATE_TM'

interface UpdateTMAction {
    type: typeof UPDATE_TM
    exercise: Exercise
    trainingMax: number
}

export type MainExerciseActionTypes = UpdateTMAction

export const SET_VOLUME_FIELD = 'SET_VOLUME_FIELD'

interface SetVolumeFieldAction {
    type: typeof SET_VOLUME_FIELD
    field: string
    value: boolean
}

export type VolumeSettingsActionTypes = SetVolumeFieldAction