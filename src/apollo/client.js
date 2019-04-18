import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

const link = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

const client = new ApolloClient({
  link,
  fetch,
  cache: new InMemoryCache(),
});

export default client;
