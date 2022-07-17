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
import { GUID_EXPRESSION } from "./utils";

function ThemedRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Template>
        <Route exact path={`${path}/:id(${GUID_EXPRESSION})/preview`}>
          <VacancyInfoPage />
        </Route>
        <Route exact path={`${path}/:id(${GUID_EXPRESSION})/application`}>
          <VacancySubmissionPage />
        </Route>
        <Route exact path={`${path}/:id(${GUID_EXPRESSION})/applied`}>
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
