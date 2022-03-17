import './App.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider as ThemeProviderOld } from '@material-ui/core';
import { ThemeProvider } from '@mui/system';

import { authApolloClient, pureApolloClient } from 'utils/apollo';
import { store } from 'utils/redux';

import {
  AuthenticatedRoutes,
  AnonymousRoutes
} from 'router';

import {
  lightTheme,
  darkTheme,
  lightThemeOld,
  darkThemeOld
} from 'utils/material';

function App() {
  const userIsAuthenticated = localStorage.getItem('refresh', false) &&
    localStorage.getItem('token', false);
  
  if (userIsAuthenticated){
    return (
      // Apollo
      <ApolloProvider client={authApolloClient}>
        {/* Material UI */}
        <ThemeProvider theme={darkTheme}>
        <ThemeProviderOld theme={darkThemeOld}>
          {/* Redux */}
          <Provider store={store}>
            {/* React-Router */}
            <AuthenticatedRoutes />
          </Provider>
        </ThemeProviderOld>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
  else{
    return (
      <ApolloProvider client={pureApolloClient}>
        <ThemeProvider theme={lightTheme}>
        <ThemeProviderOld theme={darkThemeOld}>
          <Provider store={store}>
            <AnonymousRoutes />
          </Provider>
        </ThemeProviderOld>
        </ThemeProvider>
      </ApolloProvider>
    )

  }
}

export default App;
