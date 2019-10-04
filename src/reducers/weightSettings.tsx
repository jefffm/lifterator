import { IAvailablePlates } from "../util/PlateCalculator"

export interface IWeightSettings {
    unit: string
    barWeight: number
    availablePlates: IAvailablePlates
}

const initialState: IWeightSettings = {
    // TODO: unit should be an enum
    "unit": "lbs",
    "barWeight": 45,
    "availablePlates": {
        45: 4,
        25: 3,
        10: 2,
        5: 1,
        2.5: 1
    },
}

const weightSettings = (
    state: IWeightSettings = initialState,
    action: any
): IWeightSettings => {
    // TODO: add plate, remove plate, update unit, update barWeight
    return state
}
export default weightSettings