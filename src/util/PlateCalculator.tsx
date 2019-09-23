export interface IAvailablePlates {
    [plate: number]: number
}

export interface IPlateCalcCtx {
    barWeight: number
    availablePlates: IAvailablePlates
}


export class PlateCalculator {
    ctx: IPlateCalcCtx

    constructor(ctx: IPlateCalcCtx) {
        this.ctx = ctx
    }

    getPlatesPerSide(weight: number): number[] {
        const remainingWeight = weight - this.ctx.barWeight
        const weightPerSide = remainingWeight / 2

        const availablePlates = this._normalizePlates(this.ctx.availablePlates)

        return this._getNextPlate(
            availablePlates.pop() as number, weightPerSide, availablePlates
        )
    }

    _normalizePlates(availablePlates: IAvailablePlates): number[] {
        var plates: number[] = []
        for (const [plate, quantity] of Object.entries(availablePlates)) {
            for (var i = 0; i < quantity; i++) {
                plates.push(parseFloat(plate))
            }
        }

        return plates.sort((a, b) => a - b)
    }

    _getNextPlate(
        nextPlate: number, targetWeight: number, remainingPlates: number[]
    ): number[] {
        var rv: number[] = []
        var remainingWeight: number
        if (nextPlate <= targetWeight) {
            rv.push(nextPlate)
            remainingWeight = targetWeight - nextPlate
        } else {
            remainingWeight = targetWeight
        }

        if (remainingPlates.length > 0) {
            return rv.concat(
                this._getNextPlate(
                    remainingPlates.pop() as number, remainingWeight, remainingPlates
                )
            )
        }

        return rv
    }
}

export default PlateCalculator