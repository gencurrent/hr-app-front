import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import QUERIES from '../queries';


const httpLink = new HttpLink({uri: 'http://localhost:8080/graphql'});

const AsyncTokenLookup = (refresh) => new Promise((resolve, reject) => {
    /**
     * return: data from token refresh result
     */
    const client = new ApolloClient({link: httpLink, cache: new InMemoryCache()});
    client.query({query:QUERIES.REFRESH,
        variables: {refreshToken: refresh},
        headers: {},
    }).then(response => {
        const gqlData = response.data;
        resolve(gqlData);
    }).catch(error => {
        reject(error);
    });
});

const ExtractTokenToLS = (gqlData) => new Promise((resolve, reject) => {
    // Extract token data to LocalStorage
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiresIn', tokenExp);
    resolve(gqlData);
});

const GQLDataToTokenData = (gqlData) => new Promise((succeess, reject) => {
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    succeess({token: token, tokenExpiresIn: tokenExp});
})

const TokenDataToContext = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Token Data to a context
     */ 
    const { token } = {...tokenData};
    const context = {headers: {Authorization: `Bearer ${token}`}};
    resolve(context);
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
            const now = new Date();
            if (now >= tokenExpTimestamp){
                reject(new Error('Token has expired'));
            }
            resolve(tokenData);
    }
    catch (error){
        reject(error);
    }
});



const asyncAuthLink = setContext(
    request =>
        new Promise((success, fail) => {
        // do some async lookup here
        // #1 Check token
        let token = localStorage.getItem('token');
        let tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
        tokenExpiresIn = tokenExpiresIn ? parseInt(tokenExpiresIn) : undefined;
        let refresh = localStorage.getItem('refresh');
        return CheckTokenData({token: token, tokenExpiresIn: tokenExpiresIn})
            .catch((error) => 
                AsyncTokenLookup(refresh)
                .catch(error => window.location.replace('/auth/signin'))
                .then(ExtractTokenToLS)
                .then(GQLDataToTokenData)
            )
            .then(data => (TokenDataToContext(data)))
            .then(success);
        })
);

const authApolloClient = new ApolloClient({
  link: from([asyncAuthLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

const pureApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export {authApolloClient, pureApolloClient};
