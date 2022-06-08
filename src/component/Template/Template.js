import React from "react";
import PropTypes from "prop-types";
import { Container, Box, CssBaseline } from "@mui/material";
import { Mainbar } from "component";

class Template extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Mainbar />
        <Container
          component="main"
          style={{ marginTop: "64px" }}
          color="palette.background.default"
          maxWidth="md"
        >
          <Box my={4} sx={{ py: 2 }}>
            {this.props.children}
          </Box>
        </Container>
      </>
    );
  }
}

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
