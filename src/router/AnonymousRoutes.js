/**
 * Routing for unauthenticated (anonymous) users
 */

import { React } from 'react';
import { Router, Route, Switch } from 'react-router';
import { AnonymousLandingPage, VacancySubmissionPage, AuthenticationPage } from 'appPage';
import { history } from 'utils/redux';
import { Template } from 'component';

const AnonymousRoutes = () => {
  return (
    <Router history={history}>
      <Template>
        <Switch>
          <Route path='/auth'>
            <AuthenticationPage />
          </Route>

          <Route path='/vacancy/:id([a-f,0-9]+)/submit'>
            <VacancySubmissionPage />
          </Route>
          
          <Route>
            <AnonymousLandingPage />
          </Route>
        </Switch>
      </Template>
    </Router>
  )
};

export default AnonymousRoutes;