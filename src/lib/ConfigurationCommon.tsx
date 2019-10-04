import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            margin: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(3),
        },
        textField: {
            margin: theme.spacing(1),
        },
        dense: {
            marginTop: 19,
        },
        menu: {
        },
    }),
)
