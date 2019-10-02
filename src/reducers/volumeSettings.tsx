import { IVolumeSettings } from "../types"


const initialState: IVolumeSettings = {
    "firstSetLastFives": true,
    "firstSetLastAmrap": false
}

const volumeSettings = (
    state: IVolumeSettings = initialState,
    action: any
): IVolumeSettings => {
    // TODO: volume settings toggle action
    return state
}

export default volumeSettings