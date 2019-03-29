import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/theme';
import Layout from '../components/Blog/Layout';
import Main from '../components/Blog/Main';

export const BlogContext = React.createContext();

const defaultValue = { pickedCategories: [1] };

export default () => (
  <ThemeProvider theme={theme}>
    <BlogContext.Provider value={defaultValue}>
      <Layout>
        <Main />
      </Layout>
    </BlogContext.Provider>
  </ThemeProvider>
);
