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
    }`,
    VACANCY: gql`query vacancy($id: ID!){
        vacancy(id: $id){
            position
            company
            description
            fields
            
        }
    }

    `,
    
};

export default QUERIES;