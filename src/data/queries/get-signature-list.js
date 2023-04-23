import { gql } from '@apollo/client'

export const GET_SIGNATURE_LIST = gql`
  query SignatureList {
    signatureList {
      result {
        file_name
        file_url
      }
    }
  }
`
