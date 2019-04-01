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
  ${tw`ml-6 lg:ml-8 lg:pl-0 xl:pl-16 my-3 font-bold`};
  color: ${color.category};
  box-shadow: none;
  &:hover {
    color: ${color.grayText};
  }
`;

export default () => (
  <Container>
    <HorizontalLine />
    <BackButton to="/blogs">
      ← BACK TO BLOG LIST
    </BackButton>
    <HorizontalLine />
  </Container>
);
