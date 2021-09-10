import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Box
} from '@material-ui/core';
import { Mainbar } from 'component';


class Template extends React.Component {
    // A main bootstrap template
    render() {
        return (
                <>
                <Mainbar></Mainbar>
                <Container component='main' style={{marginTop: '60px'}} maxWidth='md'>
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