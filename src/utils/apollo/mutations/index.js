/**
 * Mutations to use in the App
 */

import { gql } from "@apollo/client";

const MUTATIONS = {
  CREATE_S3_UPLOAD_REQUEST: gql`
    mutation CreateS3UploadRequest($filename: String!, $vacancyId: UUID!) {
      createS3UploadRequest(filename: $filename, vacancyId: $vacancyId) {
        id
        signature
        ts
      }
    }
  `,
  CREATE_VACANCY: gql`
    mutation CreateVacancy(
      $company: String!
      $position: String!
      $text: String!
      $fields: JSONString
    ) {
      createVacancy(
        company: $company
        position: $position
        text: $text
        fields: $fields
      ) {
        id
        company
        position
        fields
      }
    }
  `,
  DELETE_VACANCY: gql`
    mutation DeleteVacancy($vacancyId: UUID!) {
      deleteVacancy(vacancyId: $vacancyId) {
        deleted
      }
    }
  `,
  CREATE_SUBMISSION: gql`
    mutation CreateSubmission(
      $vacancyId: UUID!
      $fullname: String!
      $email: String!
      $phone: String!
      $resume: String!
      $answers: JSONString!
    ) {
      createSubmission(
        vacancyId: $vacancyId
        answers: $answers
        fullname: $fullname
        email: $email
        phone: $phone
        resume: $resume
      ) {
        fullname
        email
        phone
        resume
        answers
        ts
      }
    }
  `,

  CREATE_DEMO_REQUEST: gql`
    mutation CreateDemoRequest(
      $name: String!
      $email: String!
      $phone: String!
    ) {
      createDemoRequest(name: $name, email: $email, phone: $phone) {
        name
        email
        phone
        ts
      }
    }
  `,
};

export default MUTATIONS;
