import { gql } from '@apollo/client'

export const DELETE_SIGNATURE = gql`
  mutation DeleteSignature($fileName: String!) {
    deleteSignature(fileName: $fileName) {
      status
    }
  }
`
