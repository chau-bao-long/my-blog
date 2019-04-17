import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'typeface-montserrat';
import 'typeface-merriweather';
import 'antd/dist/antd.css';

import { theme } from './src/styles/theme';
import { provideContext } from './src/components/Blog/hooks/blogProvider';

const link = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const RootComponent = provideContext(({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </ApolloProvider>
));

export const wrapRootElement = props => <RootComponent {...props} />;
