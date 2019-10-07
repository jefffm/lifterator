import React, { ElementType } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { withRouter, RouteComponentProps } from 'react-router';

interface menuItem {
    name: string
    icon: ElementType
    path: string
}

const menuItems: menuItem[] = [
    { name: 'Program', icon: FitnessCenterIcon, path: "/program" },
    { name: 'History', icon: HistoryIcon, path: "/history" },
    { name: 'Configuration', icon: SettingsIcon, path: "/config" },
    { name: 'Import/Export', icon: ImportExportIcon, path: "/backup" },
]


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        list: {
            width: 250,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

export function SwipeableTemporaryDrawer(props: RouteComponentProps) {
    const { match, location, history } = props

    const classes = useStyles();
    const [state, setState] = React.useState({
        isOpen: false,
    });

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, isOpen: open });
    };

    const sideList = <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
        <List>
            {menuItems.map((item, index) => (
                // TODO: link this up with react-router
                <ListItem button key={index} onClick={() => history.push(item.path)}>
                    <ListItemIcon><item.icon /></ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </List>
    </div>

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit" aria-label="menu"
                onClick={toggleDrawer(true)} >
                <MenuIcon />
            </IconButton>

            <SwipeableDrawer
                open={state.isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}>
                {sideList}
            </SwipeableDrawer>
        </div>
    );
}

export default withRouter(SwipeableTemporaryDrawer)