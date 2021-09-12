import React, { useEffect, useState } from 'react';

import { 
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    Typography,
    TextField,
    Button,
    Paper,
    Tabs,
    Tab
} from '@material-ui/core';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { gql } from '@apollo/client';

import { pureApolloClient } from 'utils/apollo';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));


const SignUp = () => {
    useEffect(() => {
        
    });
    const classes = useStyles();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const hanldeSubmit = e => {
        e.preventDefault();
    };
    const onEditFname = e => {setFname(e.target.value);};
    const onEditLname = e => {setLname(e.target.value);};
    const onEditEmail = e => {setEmail(e.target.value);};
    const onEditPassword = e => {setPassword(e.target.value);};

    return (
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign Up
                </Typography>
                
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                name='firstname'
                                variant='outlined'
                                required
                                fullWidth
                                id='firstName'
                                label='First Name'
                                autoComplete='fname'
                                value={fname}
                                onChange={onEditFname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name='lastname'
                                variant='outlined'
                                required
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                autoComplete='lname'
                                value={lname}
                                onChange={onEditLname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete='email'
                                name='email'
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                value={email}
                                onChange={onEditEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='password'
                                variant='outlined'
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                type='password'
                                autoComplete='current-password'
                                value={password}
                                onChange={onEditPassword}
                            />
                        </Grid>
                        
                    </Grid>
                    <Button 
                        type='submit'
                        onClick={hanldeSubmit}
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >Sign Up</Button>
                </form>
            </div>
    )
};



const SignIn = () => {
    useEffect(() => {
        
    });
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const hanldeSubmit = e => {
        console.log('Submitted Sign In');
        e.preventDefault();
        const data = {
            username: email,
            password: password
        }
        pureApolloClient.query({
            query: gql`
                query TokenAuth($username: String!, $password: String!){
                    tokenAuth(username: $username, password: $password){
                        token
                        refreshToken
                    }
                }
            `,
            variables: {...data}
        })
        .then(({loading, data}) => {
            console.log(`Received data`, data);
            const {refreshToken, token} = {...data.tokenAuth};
            console.log(refreshToken, token);
            console.log('Client headers = ', pureApolloClient.headers);
            
            localStorage.setItem('token', token);
            localStorage.setItem('refresh', refreshToken);
            history.push('/');
        })
        .catch(error => {
            if (error.message === 'Please enter valid credentials'){
                console.warn('Invalid credentials');
            }
        })
    };
    const onEditEmail = e => {setEmail(e.target.value);};
    const onEditPassword = e => {setPassword(e.target.value);};


    return (
            <div className={classes.paper}>
                <Typography component='h1' variant='h5'>
                    Sign In
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete='email'
                                name='email'
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                value={email}
                                onChange={onEditEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name='password'
                                variant='outlined'
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                type='password'
                                autoComplete='current-password'
                                value={password}
                                onChange={onEditPassword}
                            />
                        </Grid>
                        
                    </Grid>
                    <Button 
                        type='submit'
                        onClick={hanldeSubmit}
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >Sign In</Button>
                </form>
            </div>
    )
};


const AuthenticationPage = () => {
    let { path, url } = useRouteMatch();
    let history = useHistory();
    let urlMap = [
        '/signin',
        '/signup'
    ]
    // Change default value
    let [currentTab, setCurrentTab] = useState(0);
    const handleTabChange = (e, newValue) => {
        
        history.push(`${path}${urlMap[newValue]}`)
        setCurrentTab(newValue);

    }
    return (
        
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Paper square>
                <Tabs
                  value={currentTab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleTabChange}
                  aria-label="disabled tabs example"
                  centered
                >
                    <Tab label='Sign In' component='h1'/>
                    <Tab label='Sign Up'/>
                </Tabs>
            </Paper>
            <Switch>
                <Route exact path={`${path}/signup`}>
                    <SignUp />
                </Route>
                <Route exact path={`${path}/signin`}>
                    <SignIn />
                </Route>
            </Switch>
        </Container>
    )
}

export default AuthenticationPage;