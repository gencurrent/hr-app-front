import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import QUERIES from '../queries';


const httpLink = new HttpLink({uri: `http://${window.location.hostname}:8080/graphql`});

const AsyncTokenLookup = (refresh) => new Promise((resolve, reject) => {
    /**
     * @param {String} refresh a Refresh token to lookup an Access token with
     * @return {Promise} resolves the data got from GQ query; rejects an error after the request
     */
    console.log(`AsyncTokenLookup`);
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
    /**
     * Extract token data to LocalStorage
     * @param {Object} gqlData the data received from AsyncTokenLookup promise function
     */ 
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
     * Transforma GQL Object data to an Authentication HTTP Header format
     * @param {Object} tokenData An object containing 'token' key with Access token value
     */ 
    console.log(`TokenDataToContext `, tokenData);
    const { token } = tokenData;
    const context = {headers: {Authorization: `Bearer ${token}`}};
    resolve(context);
});


const CheckTokenData = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Check the AccessToken being on its place and its Expiration
     * return: resolve — tokenData
     */
    let {token, tokenExpiresIn} = {...tokenData};
    if (!(token && tokenExpiresIn)) {
        console.log('Error here');
        reject(new Error('The token and its expiration are off'));
    }
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
        new Promise((resolve, reject) => {
        // do some async lookup here
        // #1 Check token
        let token = localStorage.getItem('token');
        let tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
        tokenExpiresIn = tokenExpiresIn ? parseInt(tokenExpiresIn) : undefined;
        let refresh = localStorage.getItem('refresh');
        /**
         * TODO: Refactor the error about 
         */
        return CheckTokenData({token: token, tokenExpiresIn: tokenExpiresIn})
            .catch((error) => 
                AsyncTokenLookup(refresh)
                .then(ExtractTokenToLS)
                .then(GQLDataToTokenData)
                .catch(error => window.location.replace('/auth/signin'))
            )
            .then(TokenDataToContext)
            .then(resolve);
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
