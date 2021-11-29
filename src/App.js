import './App.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import { authApolloClient, pureApolloClient } from 'utils/apollo';
import { store } from 'utils/redux';

import {
  AuthenticatedRoutes,
  AnonymousRoutes
} from 'router';

import { lightTheme, darkTheme } from 'utils/material';

function App() {
  const userIsAuthenticated = localStorage.getItem('refresh', false) &&
    localStorage.getItem('token', false);
  
  if (userIsAuthenticated){
    return (
      // Apollo
      <ApolloProvider client={authApolloClient}>
        {/* Material UI */}
        <ThemeProvider theme={darkTheme}>
          {/* Redux */}
          <Provider store={store}>
            {/* React-Router */}
            <AuthenticatedRoutes />
          </Provider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  else{
    return (
      <ApolloProvider client={pureApolloClient}>
        <ThemeProvider theme={darkTheme}>
          <Provider store={store}>
            <AnonymousRoutes />
          </Provider>
        </ThemeProvider>
      </ApolloProvider>
    )

  }
}

export default App;
