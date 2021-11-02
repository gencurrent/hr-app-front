/**
 * The Landing Page for unauthenticated users
 */
import { React } from 'react';
import {
  Container
} from '@material-ui/core';

function AnonymousLandingPage() {
  return (
    <Container maxWidth='sm'>
      Welcome to the HR-Eco
    </Container>
  )
};

export default AnonymousLandingPage;