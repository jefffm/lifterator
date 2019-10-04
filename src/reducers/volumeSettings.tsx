import { IVolumeSettings, VolumeSettingsActionTypes, SET_VOLUME_FIELD } from "../types"


const initialState: IVolumeSettings = {
    "firstSetLastFives": true,
    "firstSetLastAmrap": false
}

const volumeSettings = (
    state: IVolumeSettings = initialState,
    action: VolumeSettingsActionTypes
): IVolumeSettings => {
    switch (action.type) {
        case SET_VOLUME_FIELD:
            return {
                ...state,
                [action.field]: action.value
            }

        default:
            return state
    }
}

export default volumeSettings