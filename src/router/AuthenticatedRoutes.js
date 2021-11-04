import { React } from 'react';
import { Router, Route, Switch } from 'react-router';
import {
  AuthenticationPage,
  MainStatsPage,
  VacancyListPage,
  VacancyCreateEditPage,
  VacancySubmissionPage,
  SubmissionListPage
} from 'appPage';
import { history } from 'utils/redux';
import { Template } from 'component';


const AuthenticatedRoutes = () => {
  return (
    <Router history={history}>
      <Template>
        <Switch>
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
        </Switch>
      </Template>
    </Router>
  )
};

export default AuthenticatedRoutes;