import { React } from 'react';
import { Route } from 'react-router';

import {
  AuthenticationPage,
  LandingPage,
  VacancyList,
  VacancyCU,
  VacancySubmission,
} from 'appPage';


const TopRoutes = () => {
  return (
    <>
      <Route exact path='/'>
        <LandingPage />
      </Route>

      <Route path='/auth'>
        <AuthenticationPage />
      </Route>

      {/* Vacancy create */}
      <Route exact path='/vacancy/create'>
        <VacancyCU />
      </Route>

      
      <Route path='/vacancy/:id([a-f,0-9]+)/submit'>
        <VacancySubmission />
        {/* <VacancyCU edit={true} /> */}
      </Route>

      <Route exact path='/vacancy/:id([a-f,0-9]+)/edit'>
        <VacancyCU edit={true} />
      </Route>

      {/* Vacancy statistics view */}
      <Route exact path='/vacancy/:id([a-f,0-9]+)'>
      </Route>

      <Route exact path='/vacancy'>
        <VacancyList />
      </Route>
    </>
  )
};

export default TopRoutes;