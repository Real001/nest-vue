import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import cookie from 'js-cookie';

// HTTP connexion to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = cookie.get('code_student_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
