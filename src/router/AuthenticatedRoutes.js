import { React } from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';

import {
  AuthenticationPage,
  MainStatsPage,
  VacancyListPage,
  VacancyCreateEditPage,
  VacancySubmissionPage,
  SubmissionListPage
} from 'appPage';
import { store, history } from 'utils/redux';


const AuthenticatedRoutes = () => {
  return (
    <Router history={history}>
      <Route exact path='/'>
        <MainStatsPage />
      </Route>

      <Route path='/auth'>
        <AuthenticationPage />
      </Route>

      {/* Vacancy create */}
      <Route exact path='/vacancy/create'>
        <VacancyCreateEditPage />
      </Route>

      <Route exact path='/vacancy/:id([a-f,0-9]+)/edit'>
        <VacancyCreateEditPage edit={true} />
      </Route>
      
      <Route path='/vacancy/:id([a-f,0-9]+)/submit'>
        <VacancySubmissionPage />
        {/* <VacancyCU edit={true} /> */}
      </Route>


      {/* Vacancy statistics view */}
      <Route exact path='/vacancy/:id([a-f,0-9]+)'>
      </Route>

      <Route exact path='/vacancy'>
        <VacancyListPage />
      </Route>

      <Route exact path='/vacancy/:vacancyId([a-f,0-9]+)/submission'>
        <SubmissionListPage />
      </Route>
    </Router>
  )
};

export default AuthenticatedRoutes;