import { ISetPrototype, Reps, SetType, IVolumeSettings } from './Types';


export default function createSets(
    setProtoConfig: [number[], Reps[]][],
    volumeSettings: IVolumeSettings) {
    var setProtosByPhase = []

    for (const [intensitySets, repSets] of setProtoConfig) {
        var setList: ISetPrototype[] = []
        for (const [setNum, intensityPct] of intensitySets.entries()) {
            setList.push(
                {
                    intensityPct: intensityPct as number,
                    reps: repSets[setNum] as Reps
                }
            )
        }

        // Configure supplemental volume sets
        const firstSetIntensityPct = intensitySets[0]
        const firstSetReps = repSets[0]

        if (volumeSettings.firstSetLastFives) {
            // Add 5x5 at first set's intensity
            for (var i = 0; i < 5; i++) {
                setList.push({
                    intensityPct: firstSetIntensityPct as number,
                    reps: firstSetReps as Reps
                })
            }
        }

        if (volumeSettings.firstSetLastAmrap) {
            setList.push(
                {
                    intensityPct: firstSetIntensityPct as number,
                    reps: {
                        num: (firstSetReps as Reps).num,
                        setType: SetType.AMRAP
                    }
                }
            )
        }

        setProtosByPhase.push(setList)
    }

    return setProtosByPhase
}