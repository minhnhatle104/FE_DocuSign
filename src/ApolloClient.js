import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createUploadLink({
  headers: { 'Apollo-Require-Preflight': 'true' },
  uri: `http://localhost:4000/graphql`,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('signaText_accessToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})
