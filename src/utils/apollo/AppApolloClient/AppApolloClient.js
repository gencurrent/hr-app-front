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
    console.log(`AsyncTokenLookup`, refresh);
    const client = new ApolloClient({link: httpLink, cache: new InMemoryCache()});
    client.query({query:QUERIES.REFRESH,
        variables: {refreshToken: refresh},
        headers: {},
    }).then(response => {
        const gqlData = response.data;
        console.log(`AsyncTokenLookup resolve(), gqlData = `, gqlData);
        resolve(gqlData);
    }).catch(error => {
        console.log(`AsyncTokenLookup reject(), error = `, error);
        reject(error);
    });
});

const ExtractTokenToLS = (gqlData) => new Promise((resolve, reject) => {
    /**
     * Extract token data to LocalStorage
     * @param {Object} gqlData the data received from AsyncTokenLookup promise function
     */ 
    console.log(`ExtractTokenToLS, gqlData = `, gqlData);
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiresIn', tokenExp);
    resolve(gqlData);
});

const GQLDataToTokenData = (gqlData) => new Promise((resolve, reject) => {
    console.log(`GQLDataToTokenData gqlData = `, gqlData)
    let {token, payload} = {...gqlData.refreshToken};
    let tokenExp = payload.exp;
    resolve({token: token, tokenExpiresIn: tokenExp});
    reject(undefined);
})

const TokenDataToContext = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Transforma GQL Object data to an Authentication HTTP Header format
     * @param {Object} tokenData An object containing 'token' key with Access token value
     */ 
    console.log(`TokenDataToContext `, tokenData);
    if (tokenData === undefined) {
        reject();
    }
    const { token } = tokenData;
    const context = {headers: {Authorization: `Bearer ${token}`}};
    resolve(context);
});


const CheckTokenData = (tokenData) => new Promise((resolve, reject) => {
    /**
     * Check the AccessToken being on its place and its Expiration
     * return: resolve — tokenData
     */
    console.log(`CheckTokenData, tokenData = `, tokenData);
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
        console.log(`asyncAuthLink, bp2`);

        let token = localStorage.getItem('token');
        let tokenExpiresIn = localStorage.getItem('tokenExpiresIn');
        tokenExpiresIn = tokenExpiresIn ? parseInt(tokenExpiresIn) : undefined;
        let refresh = localStorage.getItem('refresh');
        console.log(`asyncAuthLink, bp1`);
        /**
         * TODO: Refactor the error about 
         */
        return CheckTokenData({token: token, tokenExpiresIn: tokenExpiresIn})
            .catch((error) => 
                AsyncTokenLookup(refresh)
                .then(ExtractTokenToLS)
                .then(GQLDataToTokenData)
                .catch(error => {
                    console.log(error.message);
                    if (error.message === 'NetworkError when attempting to fetch resource.'){
                        return resolve
                    }
                    console.log(`Error caught`, error);
                    window.location.replace('/auth/signin');
                })
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
