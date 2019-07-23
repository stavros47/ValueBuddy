import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
   
  },
  title: {
    flexGrow: 1,
  },
  test: {
    float:'left',
    paddingTop: 8
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
    //setAnchorEl(true);
  }

  function handleClose() {
    setAnchorEl(null);
  }
 
  return (
   
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title} noWrap>
            ValueBuddy
          </Typography>
          <span id = "empty-span"></span>
            <div>
            <Typography variant="h6" className={classes.test}>
            Welcome, {props.currentUser.first_name ? props.currentUser.first_name : props.currentUser.business_name}
          </Typography>
              <IconButton                
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}