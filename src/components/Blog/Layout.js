import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import More from './More';
import SEO from '../SEO';
import Category from './Category';
import { color } from '../../styles/theme';
import BackNavigation from './BackNavigation';
import { breakpoint } from '../../styles/mixins';

const Container = styled.div`
  min-height: 100vh;
  min-width: 300px;
  display: grid;
  grid-template-rows: 160px auto auto;
  grid-template-columns: 4fr 2fr;
  grid-template-areas:
  "header header"
  "category category"
  "main more";
  ${breakpoint.sm`
    grid-template-areas:
    "header header"
    "category category"
    "main main";
  `}
  transition: all 0.5s ease-out;
  background: ${color.blogLayout};
`;

const Layout = ({ children, detail }) => (
  <Container>
    <SEO
      title="Chau Bao Long"
      keywords={[
        'blog', 'topcbl', 'longcb', 'longcb blog', 'chau-bao-long', 'chau bao long', 'android',
        'ruby', 'ruby on rails', 'hacking', 'devops', 'travel', 'food', 'IT', 'coding',
      ]}
    />
    <Header />
    { detail ? <BackNavigation /> : <Category /> }
    {children}
    <More />
  </Container>
);

Layout.defaultProps = {
  detail: false,
};

export default Layout;
