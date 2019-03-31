import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../styles/theme';
import Layout from '../components/Blog/Layout';
import Main from '../components/Blog/Main';
import { provideContext } from '../components/Blog/hooks/blogProvider';

const Blog = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Main />
    </Layout>
  </ThemeProvider>
);

export default provideContext(Blog);
