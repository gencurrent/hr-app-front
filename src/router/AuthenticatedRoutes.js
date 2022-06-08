import { React } from "react";
import { Router, Route, Switch } from "react-router";
import {
  AuthenticationPage,
  MainStatsPage,
  VacancyListPage,
  VacancyCreateEditPage,
  VacancySubmissionPage,
  SubmissionListPage,
  SubmissionSalutationPage,
  VacancyPage,
  VacancyInfoPage,
} from "appPage";
import { history } from "utils/redux";
import { Template } from "component";

const AuthenticatedRoutes = () => {
  return (
    <Router history={history}>
      <Template>
        <Switch>
          <Route exact path="/">
            <MainStatsPage />
          </Route>

          <Route path="/auth">
            <AuthenticationPage />
          </Route>

          {/* Vacancy create */}
          <Route exact path="/vacancy/create">
            <VacancyCreateEditPage />
          </Route>

          <Route exact path="/vacancy/:id([a-f,0-9]+)/edit">
            <VacancyCreateEditPage edit={true} />
          </Route>

          {/* Vacancy preview (info) page */}
          <Route exact path="/vacancy/:id([a-f,0-9,\-]+)/info">
            <VacancyInfoPage />
          </Route>

          {/* Vacancy applicattion process page */}
          <Route path="/vacancy/:id([a-f,0-9,\-]+)/application">
            <VacancySubmissionPage />
          </Route>

          <Route path="/vacancy/:id([a-f,0-9]+)/applied">
            <SubmissionSalutationPage />
          </Route>

          {/* Vacancy statistics view */}
          <Route exact path="/vacancy/:id([a-f,0-9]+)">
            <VacancyPage />
          </Route>

          <Route exact path="/vacancy">
            <VacancyListPage />
          </Route>

          {/* Submission */}
          <Route exact path="/vacancy/:vacancyId([a-f,0-9]+)/submission">
            <SubmissionListPage singleVacancySusbmissions={true} />
          </Route>

          <Route exact path="/submission">
            <SubmissionListPage singleVacancySusbmissions={false} />
          </Route>
        </Switch>
      </Template>
    </Router>
  );
};

export default AuthenticatedRoutes;
