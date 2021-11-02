/**
 * Routing for unauthenticated (anonymous) users
 */

import { React } from 'react';
import { Router, Route, Switch } from 'react-router';
import { AnonymousLandingPage, VacancySubmissionPage } from 'appPage';
import { store, history } from 'utils/redux';

const AnonymousRoutes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/'>
          <AnonymousLandingPage />
        </Route>

        <Route exact path='/vacancy/:vacancyId([a-f,0-9]+)/submission'>
          <VacancySubmissionPage />
        </Route>
        
        <Route>
          
        </Route>
      </Switch>
    </Router>
  )
};

export default AnonymousRoutes;