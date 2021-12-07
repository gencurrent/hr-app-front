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
  mutation CreateSubmission(
    $vacancyId: ID!,
    $answers: JSONString!,
    $fullname: String!,
    $email: String!,
    $phone: String!
  ){
    createSubmission(vacancyId: $vacancyId, answers: $answers, fullname: $fullname, email: $email, phone: $phone){
      fullname
      email
      phone
      answers
      ts
    }
  }`,

  CREATE_DEMO_REQUEST: gql`
  mutation CreateDemoRequest(
    $name: String!,
    $email: String!,
    $phone: String!
  ){
    createDemoRequest(name: $name, email: $email, phone: $phone){
      name
      email
      phone
      ts
    }
  }`
};

export default MUTATIONS;