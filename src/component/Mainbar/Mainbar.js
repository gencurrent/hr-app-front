import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Translate, setLocale, i18nReducer } from 'react-redux-i18n';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Menu,
    MenuItem as MaterialMenuItem,
    Typography,
    IconButton
} from '@material-ui/core';
import {
  Select,
  MenuItem
} from '@mui/material';
import { AccountCircle } from '@material-ui/icons';

import languageDict from './languageDict';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Mainbar = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.i18n.locale);
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };
  
  function onLanguageSelected(e) {
    const value = e.target.value;
    dispatch(setLocale(value));
  }
  
  const onLogOutClick = () => {
    handleClose();
    let keys = ['refresh', 'token', 'tokenExpiresIn'];
    keys.forEach(key => localStorage.removeItem(key));
    
    history.push('/');
    history.go(0);
  }
  
  function getInitialLanguage() {
    return locale;  // TODO: fix
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
            <Link style={{textDecoration: 'none', color: 'white'}} to='/'>HR-App</Link>
        </Typography>
        <Select
          labelId='select-language-select-label'
          id='select-language-select'
          label='Language'
          value={getInitialLanguage()}
          onChange={onLanguageSelected}
          variant='outlined'
        >
          {Object.keys(languageDict).map((key) => (
            <MenuItem value={languageDict[key].short}>{languageDict[key].full}</MenuItem>) 
          )}

        </Select>
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
                <MaterialMenuItem onClick={handleClose}>Profile</MaterialMenuItem>
                <MaterialMenuItem onClick={onLogOutClick}>Log Out</MaterialMenuItem>
            </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Mainbar;