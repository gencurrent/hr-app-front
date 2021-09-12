/**
 * Mutations to use in the App
 */

import { gql } from '@apollo/client';

const MUTATIONS = {
  CREATE_VACANCY: gql`
  mutation CreateVacancy($company: String!, $position: String!, $text: String!, $fields: JSONString!){
      createVacancy(company: $company, position: $position, text: $text, fields: $fields){
          company
          position
          fields
      }
  }`
};

export default MUTATIONS;