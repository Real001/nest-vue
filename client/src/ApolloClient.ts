import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// HTTP connexion to the API
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export default new ApolloClient({
  link: httpLink,
  cache,
});
