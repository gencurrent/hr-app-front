// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Switch, Router } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

import { store, history } from 'utils/redux';
import { authApolloClient, pureApolloClient } from 'utils/apollo';
import { Template } from 'component';
import { TopRoutes } from 'router';

const theme = createTheme({
  palette: {
    type: 'dark',
    // background: {
    //   default: 'dark'
    // },
    primary: {
      light: deepOrange[500],
      main: deepOrange[500],
      dark: deepOrange[500]
    },
    secondary: {
      main: deepOrange[200]
    },
    background: {
      main: '#202020'
    }
  }
})

function App() {
  const userIsAuthenticated = localStorage.getItem('refresh', false);
  
  if (userIsAuthenticated){
    return (
      // Apollo
      <ApolloProvider client={authApolloClient}>
        {/* Material UI */}
        <ThemeProvider theme={theme}>
          {/* Redux */}
          <Provider store={store}>
            {/* React-Router */}
            <Router history={history}>
              <Template>
                <Switch>
                  <TopRoutes />
                </Switch>
              </Template>
            </Router>
          </Provider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  else{
    return (
      <ApolloProvider client={pureApolloClient}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            Hello world
            </Provider>
        </ThemeProvider>
      </ApolloProvider>
    )

  }
}

export default App;
