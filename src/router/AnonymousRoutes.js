/**
 * Routing for unauthenticated (anonymous) users
 */

import { React } from 'react';
import { Router,
  Route,
  Switch } from 'react-router';
import {
  AnonymousLandingPage,
  AnonymousVacancySubmissionPage,
  AuthenticationPage,
  SubmissionSalutationPage
} from 'appPage';
import { CssBaseline } from '@material-ui/core';
import { history } from 'utils/redux';
import { Template } from 'component';

const AnonymousRoutes = () => {
  return (
    <Router history={history}>
        <CssBaseline/>
        <Switch>
          <Route path='/auth'>
            <AuthenticationPage />
          </Route>

          <Route path='/vacancy/:id([a-f,0-9]+)/apply'>
            <Template>
              <AnonymousVacancySubmissionPage />
            </Template>
          </Route>

          <Route path='/vacancy/:id([a-f,0-9]+)/applied'>
            <Template>
              <SubmissionSalutationPage />
            </Template>
          </Route>
          
          <Route>
            <AnonymousLandingPage />
          </Route>
        </Switch>
    </Router>
  )
};

export default AnonymousRoutes;