import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
  from,
  gql,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
// import { setContext } from '@apollo/client/link/context';
import { useHistory } from 'react-router-dom';
import QUERIES from '../queries';

const httpLink = new HttpLink({uri: 'http://localhost:8080/graphql'});



// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('token');
//     if (token){
//         console.log(`Access token not found`, token);
//         console.log(`Access token`)
//         return {
//             headers: {
//                 ...headers,
//                 HTTP_Authorization: `Bearer ${token}`
//             }
//         };
//     }
//     else {
//         console.log(`Access token not found`);
//         return {headers: {...headers}};
//     }
// });

const authMiddleware = new ApolloLink((operation, forward) => {
  // let token = localStorage.getItem('token');
  // if (token){
  //     console.log(`Access token found`);
  //     operation.setContext({
  //         headers: {HTTP_authorization: token}
  //     });
  //     return;
  // }
  // if (!token){
  //     /** Update Refresh token on token missing or expired */
  //     console.log(`Access token not found`);
  //     let refresh = localStorage.getItem('refresh');
  //     if (refresh){
  //         console.log(`Refresh token found`);
  //         // const client = new ApolloClient({link: httpLink});
  //         // client.query(gql`
  //         //     query refresh($refreshToken: String!){refreshToken(refreshToken: $refreshToken){
  //         //         token
  //         //     }}`,
  //         //     {variables: {refreshToken: refresh}}
  //         // )
  //         // .then(result => {
  //         //     window.location.assign('/authenticate');

  //         // })
  //         // .catch(error => console.log(`Error catched refreshing token`));
  //     }
      
  // };

  console.log(`authMiddleware // Operation`, operation)
  if (operation.operationName === 'refresh' || operation.operationName === 'tokenAuth'){
      operation.setContext({headers: {
        ...operation.getContext().headers,
        Authorization: undefined
      }})
    //   return forward(operation);
  }
  else {
    const token = localStorage.getItem('token');
    operation.setContext({
        headers: {
            ...operation.getContext().headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    });
  }
  console.log(`authMiddleware // operation.getContext()`, operation.getContext())
  return forward(operation);
  // On Data return operation
//   return forward(operation).map((data) => {
//       console.log(`After operation operation=`, operation);
//       console.log(`After operation data=`, data);
//       let refresh = localStorage.getItem('refresh');
//       if (!data.errors){
//           return data;
//       }
//       const firstError = data.errors[0].message;
//       console.log('First error', firstError);
//       // let history = useHistory();
//       if (firstError === 'You do not have permission to perform this action'){
//           // Making new query 
//           // const client = new ApolloClient({link: httpLink});
//           if (!refresh){
//               // Refresh not found —˘ Need to sign in
//               console.log('Refresh token not found');
//               // Use only inside hooks
//               // history.push('/auth/signin');
//               console.log('Should change url ')
//               // window.location.assign('/auth/signin');
//           }
          
//           // console.log('Refresh token found');
          
              
//           // client.query({query:gql`
//           //     query refresh($refreshToken: String!){refreshToken(refreshToken: $refreshToken){
//           //         token
//           //     }}`,
//           //     variables: {refreshToken: refresh}
//           // }).then((data) => {
//           //     console.log(`Executed fetching Access token`);
//           //     // localStorage.setItem(token, `Bearer ${data.token}`);
//           // }).catch(error => {
//           //     // TODO: Find out what type of error: if refresh token obtaining error, then reauthenticate
//           // });
          
//           return data;
//       }
//       else if (firstError === 'Signature has expired' || firstError === 'Error decoding signature') {
          
//           if (!refresh){
//               // Refresh token not found — resign in again
//               console.log('Refresh token not found');
//               window.location.assign('/auth/signin');
//           }
//           appApolloClient.query({query:QUERIES.REFRESH,
//               variables: {refreshToken: refresh},
//               headers: {},
//           }).then((response) => {
//               let gqlData = response.data;
//               console.log(`Executed fetching Access token, response = `, response);
//               // console.
//               let newToken = gqlData.refreshToken.token;
//               console.log('token fetched = ', newToken);
//               localStorage.setItem('token', newToken);
//             //   return data;
//               return forward(operation);
//               // localStorage.setItem(token, `Bearer ${data.token}`);
//           })
//       }
//       return data;
//   });
});

const updateToken = refresh => {
    const client = new ApolloClient({link: httpLink, cache: new InMemoryCache()});
    
    const data = client.query({query:QUERIES.REFRESH,
        variables: {refreshToken: refresh},
        headers: {},
    }).then(response => {
        const gqlData = response.data;
        let newToken = gqlData.refreshToken.token;
        localStorage.setItem('token', newToken);
        return newToken;
    });
    return data;
}


const AsyncTokenLookup = (refresh) => new Promise((resolve, reject) => {
    /**
     * return: data from token refresh result
     */
    console.log('AsyncTokenLookup // start')
    const client = new ApolloClient({link: httpLink, cache: new InMemoryCache()});
    client.query({query:QUERIES.REFRESH,
        variables: {refreshToken: refresh},
        headers: {},
    }).then(response => {
        const gqlData = response.data;
        let newToken = gqlData.refreshToken.token;
        console.log('AsyncTokenLookup // data', gqlData);
        // resolve(newToken);
        resolve(gqlData);
    }).catch(error => {
        console.error('AsyncTokenLookup // error', error);
        reject(error);
    });
});

const ExtractTokenToLS = (gqlData) => new Promise((resolve, reject) => {
    // Extract token data to LocalStorage
    console.log('ExtractTokenToLS // start // gqlData', gqlData);
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiresIn', tokenExp);
    resolve(gqlData);
});

const GQLDataToTokenData = (gqlData) => new Promise((succeess, reject) => {
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    return {token: token, tokenExpiresIn: tokenExp};
})

const ExtractGQLTokenToContext = (gqlData) => new Promise((resolve, reject) => {
    // Extract data from GraphQL tokenRefresh to Context
    const token = gqlData.refreshToken.token;
    const context = {
        headers: {
            Authorization: token
        }
    }
    resolve(context);
});


const TokenDataToContext = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Token Data to a context
     */ 
     const {token, tokenExpiresIn} = {...tokenData};
    resolve({headers: {Authorization: token}});
});


const CheckTokenData = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Check the AccessToken Expiration
     * return: resolve — tokenData
     * return: reject — Error
     */
    let {token, tokenExpiresIn} = {...tokenData};
    if (!(token && tokenExpiresIn)) reject();
    try{
        tokenExpiresIn = parseInt(tokenExpiresIn);
        const tokenExpTimestamp = new Date(tokenExpiresIn * 1000);
            console.log('CheckTokenData // ', tokenExpTimestamp);
            const now = new Date();
            if (now >= tokenExpTimestamp){
                reject(new Error('Token has expired'));
            }
            return resolve(tokenData);
    }
    catch (error){
        console.error('CheckTokenData // ', error);
        reject(error);
    }
});



const asyncAuthLink = setContext(
    request =>
      new Promise((success, fail) => {
        console.log('asyncAuthLink // start');
        // do some async lookup here
        // #1 Check token
        let token = localStorage.getItem('token');
        let tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
        tokenExpiresIn = tokenExpiresIn ? parseInt(tokenExpiresIn) : undefined;
        let refresh = localStorage.getItem('refresh');
        return CheckTokenData({token: token, tokenExpiresIn: tokenExpiresIn})
            .catch((_) => AsyncTokenLookup(refresh).then(ExtractTokenToLS))
            .then(TokenDataToContext)
            .then(success)
        if (token && tokenExpiresIn){
            console.log('asyncAuthLink // token && tokenExp');
            // #2 Check token expiration
            const tokenExpTimestamp = new Date(tokenExpiresIn * 1000);
            console.log('asyncAuthLink // ', tokenExpTimestamp);
            const now = new Date();
            if (now >= tokenExpTimestamp){
                // #3 Refresh token if token is expired or unset
                return TokenDataToContext({token: token, tokenExpiresIn: tokenExpiresIn}).then(success);
            }

        }
        else {
            console.log('asyncAuthLink // (!token && tokenExp)');
            let refresh = localStorage.getItem('refresh');
            return AsyncTokenLookup(refresh).then(ExtractTokenToLS).then(ExtractGQLTokenToContext).then(success);
        }
        
        
        
        setTimeout(() => {
        console.log('asyncAuthLink // success');
        console.log('asyncAuthLink // request', request);
          success({ token: "async found token" });
        }, 10);
      })
  );

const setHeaderLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
      headers: {
          ...operation.getContext.headers,
          Authorization: token ? `Bearer ${token}` : ''
        }
  });
  console.log('setHeaderLink // operaion');
  return forward(operation);
});


const appApolloClient = new ApolloClient({
//   link: concat(setHeaderLink, authMiddleware).concat(httpLink),
//   link: from([asyncAuthLink, onErrorLink, authMiddleware, asyncAuthLink.concat(httpLink)]),
  link: from([asyncAuthLink, authMiddleware.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default appApolloClient;