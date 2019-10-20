import { ISetSettings, SetSettingsActionTypes, SET_SETTINGS_FIELD } from "../types"


const initialState: ISetSettings = {
    "firstSetLastFives": true,
    "firstSetLastAmrap": false
}

const setSettings = (
    state: ISetSettings = initialState,
    action: SetSettingsActionTypes
): ISetSettings => {
    switch (action.type) {
        case SET_SETTINGS_FIELD:
            return {
                ...state,
                [action.field]: action.value
            }

        default:
            return state
    }
}

export default setSettings