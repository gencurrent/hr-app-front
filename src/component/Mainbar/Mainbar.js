import { React, useState } from 'react';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
    IconButton
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Mainbar = () => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
      setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
      setAnchorEl(null);
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
            <Link style={{textDecoration: 'none', color: 'white'}} to='/'>HR-App</Link>
        </Typography>
        <div>
            {/* TODO: Insert Typographed username here */}
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              >
                <AccountCircle />
            </IconButton>
            <Menu
              id='menu-bar'
              anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Mainbar;