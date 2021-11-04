/**
 * The Landing Page for unauthenticated users
 */
import { React } from 'react';
import {
  Container
} from '@material-ui/core';
import { Link } from 'react-router-dom';

function AnonymousLandingPage() {
  return (
    <Container maxWidth='sm'>
      Welcome to the HR-Eco
      <Link to={`/auth/signin`}>Authenticate</Link>
    </Container>
  )
};

export default AnonymousLandingPage;