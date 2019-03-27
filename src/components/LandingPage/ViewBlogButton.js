import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link } from 'gatsby';

import { responsible } from '../../styles/mixins';

const Button = styled(Link)`
  ${responsible}
  background: white;
  border-radius: 3em;
  color: black;
  padding: 16px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  &:hover {
    color: black;
  }
`;

const ArrowIcon = styled(Icon)`
  margin-left: 12px;
`;

export default () => (
  <Button to="/blogs">
    VIEW MY BLOGS
    <ArrowIcon type="arrow-right" />
  </Button>
);
