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

interface menuItem {
    name: string
    icon: ElementType
}

const menuItems: menuItem[] = [
    { name: 'Program', icon: FitnessCenterIcon },
    { name: 'History', icon: HistoryIcon },
    { name: 'Configuration', icon: SettingsIcon },
    { name: 'Import/Export', icon: ImportExportIcon },
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

export default function SwipeableTemporaryDrawer() {
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
                <ListItem button key={index} onClick={() => console.log(item.name)}>
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