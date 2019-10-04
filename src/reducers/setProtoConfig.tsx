import { INTENSITY_SCHEME_DATA, REPETITIONS_SCHEME_DATA, Reps } from '../types';


export type ISetProtoConfig = [number[], Reps[]][]

const initialState: ISetProtoConfig = [
    [INTENSITY_SCHEME_DATA["3s"], REPETITIONS_SCHEME_DATA["5s pro"]],
    [INTENSITY_SCHEME_DATA["5s"], REPETITIONS_SCHEME_DATA["5s pro"]],
    [INTENSITY_SCHEME_DATA["1s"], REPETITIONS_SCHEME_DATA["5s pro"]]
]


const setProtoConfig = (
    state: ISetProtoConfig = initialState,
    action: any
): ISetProtoConfig => {
    // TODO: append, update, delete, swap (reorder)
    return state
}

export default setProtoConfig