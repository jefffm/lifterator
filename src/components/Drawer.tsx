import React, { ElementType } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

interface menuItem {
    name: string
    icon: ElementType
}

const menuItems: menuItem[] = [
    { name: 'Program', icon: InboxIcon },
    { name: 'History', icon: InboxIcon },
    { name: 'Configuration', icon: InboxIcon },
    { name: 'Import', icon: InboxIcon },
    { name: 'Export', icon: InboxIcon }
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
                <ListItem button key={index}>
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