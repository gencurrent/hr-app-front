/**
 * Queries constants to use in the App
 */

import { gql } from '@apollo/client';

const QUERIES = {
    TOKEN_AUTH: gql`
    query TokenAuth($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            token
            refreshToken
        }
    }`,
    REFRESH: gql`query refresh($refreshToken: String!){refreshToken(refreshToken: $refreshToken){
        token
        payload
    }}`,
    VACANCY_LIST:  gql`query vacancyList{
       vacancyList{
           id
           company
           position
           text
       } 
    }`
};

export default QUERIES;