/**
 * Queries constants to use in the App
 */

import { gql } from "@apollo/client";

const QUERIES = {
  TOKEN_AUTH: gql`
    query TokenAuth($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
        refreshToken
      }
    }
  `,
  REFRESH: gql`
    query refresh($refreshToken: String!) {
      refreshToken(refreshToken: $refreshToken) {
        token
        payload
      }
    }
  `,
  VACANCY_LIST: gql`
    query vacancyList {
      vacancyList {
        id
        company
        position
        text
        submissionCountTotal
      }
    }
  `,
  VACANCY: gql`
    query vacancy($id: UUID!) {
      vacancy(id: $id) {
        id
        position
        company
        text
        fields
        ts
      }
    }
  `,
  VACANCY_WITH_SUBMISSION_LIST: gql`
    query vacancy($id: UUID!) {
      vacancy(id: $id) {
        id
        position
        company
        text
        fields
        submissionList {
          id
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
    }
  `,
  SUBMISSION_LIST: gql`
    query submissionList($vacancyId: UUID) {
      submissionList(vacancyId: $vacancyId) {
        id
        fullname
        email
        phone
        resume
        answers
        decision
        comment
        ts
        vacancy {
          id
          fields
          position
          company
        }
      }
    }
  `,
  USER_MAIN_STATS: gql`
    query userMainStatistics {
      userMainStatistics {
        submissionCountTotal
        submissionCountNew
        submissionCountByDate {
          date
          submissionCountTotal
        }
        vacancyStatsList {
          id
          position
          company
          submissionCountTotal
          submissionCountNew
        }
      }
    }
  `,
};

export default QUERIES;
