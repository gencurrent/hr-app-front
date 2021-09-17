// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Switch, Router } from 'react-router';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { purple, deepOrange } from '@material-ui/core/colors';

import { store, history } from 'utils/redux';
import { authApolloClient } from 'utils/apollo';
import { Template } from 'component';
import { TopRoutes } from 'router';

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: 'dark'
    },
    primary: {
      main: deepOrange[500]
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
  return (
    <ApolloProvider client={authApolloClient}>
      <ThemeProvider theme={theme}>
      
        <Provider store={store}>
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

export default App;
