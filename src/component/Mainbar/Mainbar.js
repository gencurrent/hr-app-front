import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Translate, setLocale } from 'react-redux-i18n';
import { makeStyles } from '@mui/styles';
import {
  AppBar,
  Toolbar,
  Menu,
  Typography,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import languageDict from './languageDict';
import './index.css';


const useStyles = makeStyles(theme => (console.log('theme = ', theme) || {
  languageSelector: {
    color: `${theme.palette.background.default} !important`,
    borderColor: 'rgba(255, 255, 255, 0.43)'
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

  return (
    <AppBar>
      <Toolbar id='header-toolbar'>
        <Typography variant='h6' className={classes.title}>
            <Link style={{textDecoration: 'none', color: 'white'}} to='/'>HR-App</Link>
        </Typography>
        <Select
          labelId='select-language-select-label'
          id='select-language-select'
          value={locale}
          onChange={onLanguageSelected}
          className={classes.languageSelector}
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
                <MenuItem onClick={handleClose}><Translate value='mainBar.profile' /></MenuItem>
                <MenuItem onClick={onLogOutClick}><Translate value='mainBar.logOut' /></MenuItem>
            </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Mainbar;