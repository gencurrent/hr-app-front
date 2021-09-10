// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Switch, Router, Route } from 'react-router';

import {
  AuthenticationPage,
  LandingPage,
  VacancyList,
  VacancyCU,
  VacancySubmission,
} from 'appPage';
import { Template } from 'component';
import { store, history } from 'utils/redux';
import client from 'utils';


function App() {
  return (
    <ApolloProvider client={client}>

      
      <Provider store={store}>
        <Router history={history}>
          <Template>
            <Switch>
              <Route exact path='/'>
                <LandingPage />
              </Route>

              <Route path='/auth'>
                <AuthenticationPage />
              </Route>

              {/* Vacancy create page */}
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

              <Route exact path='/vacancy'>
                <VacancyList />
              </Route>
            </Switch>
                
          </Template>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
