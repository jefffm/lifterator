import { ISetPrototype, Reps, SetType, IVolumeSettings } from '../types';
import { ISetProtoConfig } from '../reducers/setProtoConfig';


/**
 * Put the set/rep/intensity scheme together with the volume settings into "set prototypes" for each week
 * 
 * A Set Prototype can be combined with an Exercise to generate the sets to do on a given day
 */
export default function createSets(
    setProtoConfig: ISetProtoConfig,
    volumeSettings: IVolumeSettings): ISetPrototype[][] {
    var setProtosByPhase = []

    // For each workout...
    for (const [intensitySets, repSets] of setProtoConfig) {
        var setList: ISetPrototype[] = []

        // For each set
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