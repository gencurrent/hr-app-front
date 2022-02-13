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
           submissionCountTotal
       } 
    }`,
    VACANCY: gql`query vacancy($id: ID!, $forSubmission: Boolean = null){
        vacancy(id: $id, forSubmission: $forSubmission){
            uuid
            submissionUUID
            position
            company
            text
            fields
            ts
        }
    }`,
    VACANCY_WITH_SUBMISSION_LIST: gql`query vacancy($id: ID!){
        vacancy(id: $id){
            uuid
            position
            company
            text
            fields
            submissionList {
                uuid
                fullname
                email
                phone
                resume
                answers
                decision
                comment
                ts
            }
        }
    }`,
    USER_MAIN_STATS:  gql`query userMainStats{
        userMainStats{
            submissionCountTotal
            submissionCountNew
            vacancyStatsList{
                id
                position
                company
                submissionCountTotal
                submissionCountNew
            }
        }
     }`,
    
};

export default QUERIES;