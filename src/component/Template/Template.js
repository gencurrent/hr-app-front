import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    CssBaseline
} from '@material-ui/core';
import { Mainbar } from 'component';


class Template extends React.Component {
    // A main bootstrap template
    render() {
        return (
                <>
                <CssBaseline/>
                <Mainbar></Mainbar>
                <Container component='main' style={{marginTop: '64px'}} color='palette.background.default' maxWidth='md'>
                    <Box my={4}>
                        {this.props.children}
                        
                    </Box>
                </Container>
                {/* TODO: Kind of bottom bar should be here */}
                </>
        )
    }
};

Template.propTypes = {
    children: PropTypes.element.isRequired
};

export default Template;