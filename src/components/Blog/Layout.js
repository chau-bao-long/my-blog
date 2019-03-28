import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import More from './More';
import SEO from '../SEO';
import Category from './Category';

const Layout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 160px 48px auto;
  grid-template-columns: 4fr 2fr;
  grid-template-areas:
  "header header"
  "category category"
  "main more";
  transition: all 0.5s ease-out;
  background: #F7F7F7;
`;

export default ({ children }) => (
  <Layout>
    <SEO
      title="Chau Bao Long"
      keywords={['blog', 'topcbl', 'longcb', 'longcb blog', 'chau-bao-long', 'chau bao long']}
    />
    <Header />
    <Category />
    {children}
    <More />
  </Layout>
);
