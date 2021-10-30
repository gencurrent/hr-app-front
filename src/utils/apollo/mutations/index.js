/**
 * Mutations to use in the App
 */

import { gql } from '@apollo/client';

const MUTATIONS = {
  CREATE_S3_UPLOAD_REQUEST: gql`
  mutation CreateS3UploadRequest($filename: String!, $vacancyUUID: UUID!, $submissionUUID: UUID!){
    createS3UploadRequest(filename: $filename, vacancyUUID: $vacancyUUID, submissionUUID: $submissionUUID){
      uuid
      signature
      ts
    }
  }`,
  CREATE_VACANCY: gql`
  mutation CreateVacancy($company: String!, $position: String!, $text: String!, $fields: JSONString){
      createVacancy(company: $company, position: $position, text: $text, fields: $fields){
          company
          position
          fields
      }
  }`,
  DELETE_VACANCY: gql`
  mutation DeleteVacancy($vacancyId: ID!){
    deleteVacancy(vacancyId: $vacancyId){
      deleted
    }
  }`,
  CREATE_SUBMISSION: gql`
  mutation CreateSubmission($vacancyId: ID!, $answers: JSONString!){
    createSubmission(vacancyId: $vacancyId, answers: $answers){
      answers
      ts
    }
  }`
};

export default MUTATIONS;