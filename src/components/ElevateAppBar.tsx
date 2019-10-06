import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface Props {
    title: string
    menuButton: () => React.ReactElement
    children: React.ReactElement
}

function ElevationScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

export default function ElevateAppBar(props: Props) {
    const classes = useStyles();

    return <div className={classes.root}>
        <ElevationScroll {...props}>
            <AppBar>
                <Toolbar>
                    {props.menuButton()}
                    <Typography variant="h6">{props.title}</Typography>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
            {props.children}
        </Container>
    </div>
}