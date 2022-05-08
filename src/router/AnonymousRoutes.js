/**
 * Routing for unauthenticated (anonymous) users
 */

import { React } from "react";
import { Router, Route, Switch, useRouteMatch } from "react-router-dom";
import { history } from "utils/redux";
import { CssBaseline } from "@mui/material";
import { Template } from "component";

import {
  AnonymousLandingPage,
  VacancySubmissionPage,
  AuthenticationPage,
  SubmissionSalutationPage,
  VacancyInfoPage,
} from "appPage";

function ThemedRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Template>
        <Route exact path={`${path}/:id([a-f,0-9]+)/info`}>
          <VacancyInfoPage />
        </Route>
        <Route exact path={`${path}/:id([a-f,0-9]+)/application`}>
          <VacancySubmissionPage />
        </Route>
        <Route exact path={`${path}/:id([a-f,0-9]+)/applied`}>
          <SubmissionSalutationPage />
        </Route>
      </Template>
    </Switch>
  );
}

const AnonymousRoutes = () => {
  return (
    <Router history={history}>
      <CssBaseline />
      <Switch>
        <Route path="/auth">
          <AuthenticationPage />
        </Route>
        {/* Vacancy preview (info) page */}
        <Route path="/vacancy">
          <ThemedRoutes />
        </Route>

        <Route>
          <AnonymousLandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AnonymousRoutes;
