import { INTENSITY_SCHEME_DATA, REPETITIONS_SCHEME_DATA, Reps } from '../types';


/**
 * List of each phase's set/rep/intensity scheme
 * 
 * This is used to build set prototypes for each workout.
 * 
 * A Set Prototype is just a zip of each element from both lists.
 */
export type IntensityRepScheme = [number[], Reps[]]

const initialState: IntensityRepScheme[] = [
    [INTENSITY_SCHEME_DATA["3s"], REPETITIONS_SCHEME_DATA["5s pro"]],
    [INTENSITY_SCHEME_DATA["5s"], REPETITIONS_SCHEME_DATA["5s pro"]],
    [INTENSITY_SCHEME_DATA["1s"], REPETITIONS_SCHEME_DATA["5s pro"]]
]


const phaseIntensityRepSchemes = (
    state: IntensityRepScheme[] = initialState,
    action: any
): IntensityRepScheme[] => {
    // TODO: append, update, delete, swap (reorder)
    return state
}

export default phaseIntensityRepSchemes