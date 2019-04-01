import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Link } from 'gatsby';
import { Divider } from 'antd';

import { color } from '../../styles/theme';

const Container = styled.div`
  grid-area: category;
  ${tw`flex flex-col justify-between items-stretch`};
`;

const HorizontalLine = styled(Divider)`
  ${tw`my-auto`};
`;

const BackButton = styled(Link)`
  color: ${color.category};
  box-shadow: none;
  margin-left: 6rem;
  &:hover {
    color: ${color.grayText};
  }
`;

export default () => (
  <Container>
    <HorizontalLine />
    <BackButton to="/blogs">
      ← GO BACK
    </BackButton>
    <HorizontalLine />
  </Container>
);
