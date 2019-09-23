export const INTENSITY_SCHEME_DATA = {
    '5s': [0.65, 0.75, 0.85],
    '3s': [0.70, 0.80, 0.90],
    '1s': [0.75, 0.85, 0.95]
}

export type IntensityScheme = '5s' | '3s' | '1s'

export interface ITrainingMaxes {
    [exercise: string]: number
}

export default IntensityScheme;

