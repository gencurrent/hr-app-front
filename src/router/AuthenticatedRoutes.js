import { React } from "react";
import { Router, Route, Switch } from "react-router";
import {
  AuthenticationPage,
  DashboardPage,
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

import { GUID_EXPRESSION } from "./utils";

const AuthenticatedRoutes = () => {
  return (
    <Router history={history}>
      <Template>
        <Switch>
          <Route exact path="/">
            <DashboardPage />
          </Route>

          <Route path="/auth">
            <AuthenticationPage />
          </Route>

          {/* Vacancy create */}
          <Route exact path="/vacancy/create">
            <VacancyCreateEditPage />
          </Route>

          {/* 
          <Route exact path={`/vacancy/:id(${GUID_EXPRESSION})/edit`}>
            <VacancyCreateEditPage edit={true} />
          </Route> */}

          {/* Vacancy preview (info) page */}
          <Route exact path={`/vacancy/:id(${GUID_EXPRESSION})/preview`}>
            <VacancyInfoPage />
          </Route>

          {/* Vacancy applicattion process page */}
          <Route path={`/vacancy/:id(${GUID_EXPRESSION})/application`}>
            <VacancySubmissionPage />
          </Route>

          <Route path={`/vacancy/:id(${GUID_EXPRESSION})/applied`}>
            <SubmissionSalutationPage />
          </Route>

          {/* Vacancy statistics view */}
          <Route exact path={`/vacancy/:id(${GUID_EXPRESSION})`}>
            <VacancyPage />
          </Route>

          <Route exact path="/vacancy">
            <VacancyListPage />
          </Route>

          {/* Submission list related to a Vacancy Id */}
          <Route
            exact
            path={`/vacancy/:vacancyId(${GUID_EXPRESSION})/submission`}
          >
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
