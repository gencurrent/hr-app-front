import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Box,
    CssBaseline
} from '@material-ui/core';
import { Mainbar } from 'component';


class Template extends React.Component {
    render() {
        return (
                <>
                <CssBaseline/>
                <Mainbar/>
                <Container component='main' style={{marginTop: '64px'}} color='palette.background.default' maxWidth={false}>
                    <Box my={4}>
                        {this.props.children}
                    </Box>
                </Container>
                </>
        )
    }
};

Template.propTypes = {
    children: PropTypes.element.isRequired
};

export default Template;