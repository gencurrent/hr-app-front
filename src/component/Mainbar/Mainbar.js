import { React } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import { Link } from '@material-ui/core';

const Mainbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Link style={{textDecoration: 'none', color: 'white'}} to='/'>HR-App</Link>
                {/* <Button align='right' color='inherit'>Login</Button> */}
            </Toolbar>
        </AppBar>
    )
}

export default Mainbar;