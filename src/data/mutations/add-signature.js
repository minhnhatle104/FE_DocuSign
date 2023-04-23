import { gql } from '@apollo/client'

export const ADD_SIGNATURE = gql`
  mutation AddSignature($file: UploadFile!) {
    addSignature(file: $file) {
      status
    }
  }
`
