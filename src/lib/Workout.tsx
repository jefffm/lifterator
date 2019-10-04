import React from 'react'
import SetGroup from '../components/WorkoutSetTable';
import { round5 } from '../util/Math';
import PlateCalculator from '../util/PlateCalculator'
import { ISetPrototype, SetType } from '../types';
import Grid from '@material-ui/core/Grid'
import WarmupGen from './WarmupGen'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { WorkoutSetProps } from '../components/WorkoutSetRow';
import { Exercise, IExerciseWeightMapping } from './Exercises';
import { isUndefined } from 'util';
import ExerciseProvider from './Exercises';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

type WorkoutProps = {
    number: number
    phase: number
    mainLifts: Exercise[]
    plateCalculator: PlateCalculator
    warmupGen: WarmupGen
    setProtos: ISetPrototype[]
    unit: string
    accessorySets: WorkoutSetProps[]
};

export function Workout(props: WorkoutProps) {
    const number = props.number
    const phase = props.phase
    const setProtos = props.setProtos
    const mainLifts = props.mainLifts
    const plateCalculator = props.plateCalculator
    const warmupGen = props.warmupGen
    const unit = props.unit

    const classes = useStyles()

    const mainSets = mainLifts
        .filter(x => !isUndefined(x.trainingMax))
        .map(
            function (lift) {
                const trainingMax = lift.trainingMax as number

                const sets = setProtos.map(
                    function (setProto: ISetPrototype): WorkoutSetProps {
                        const setReps = setProto.reps
                        const setWeight = round5(
                            trainingMax * setProto.intensityPct
                        )
                        return {
                            exercise: lift.name,
                            reps: setReps,
                            weight: setWeight,
                            plates: plateCalculator.getPlatesPerSide(setWeight)
                        }
                    }
                )

                const warmupSets = warmupGen.getSets(lift.name, trainingMax, sets[0].weight)
                    .map(function (set): WorkoutSetProps {
                        return {
                            exercise: lift.name,
                            reps: { "num": set.reps, "setType": SetType.WARMUP },
                            weight: set.weight,
                            plates: plateCalculator.getPlatesPerSide(set.weight)
                        }
                    })

                return <SetGroup
                    key={lift.shortname}
                    name={lift.shortname}
                    sets={warmupSets.concat(sets)}
                    unit={unit} />
            }

        )

    const allSets = mainSets.concat([
        <SetGroup name="Accessories" sets={props.accessorySets} unit={unit} />
    ])

    return <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h5" component="h3">
                Phase {phase + 1}: Workout {number}
            </Typography>
            <Grid container>
                {allSets.map(set => {
                    return <Grid item xs={12} sm={6}>
                        {set}
                    </Grid>
                })}
            </Grid >
        </Paper>
    </div>
}

export default Workout