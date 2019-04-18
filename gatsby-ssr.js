import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import 'typeface-montserrat';
import 'typeface-merriweather';
import 'antd/dist/antd.css';

import { theme } from './src/styles/theme';
import { provideContext } from './src/components/Blog/hooks/blogProvider';
import client from './src/apollo/client';

const RootComponent = provideContext(({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </ApolloProvider>
));

export const wrapRootElement = props => <RootComponent {...props} />;

