import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Link } from 'gatsby';
import { Divider } from 'antd';

const Container = styled.div`
  grid-area: category;
  ${tw`flex flex-col justify-between items-stretch`};
`;

const HorizontalLine = styled(Divider)`
  ${tw`my-auto`};
`;

const BackButton = styled(Link)`
  color: ${p => p.theme.color.category};
  box-shadow: none;
  margin-left: 6rem;
  &:hover {
    color: ${p => p.theme.color.grayText};
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
