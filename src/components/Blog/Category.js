import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import tw from 'tailwind.macro';

const Container = styled.div`
  grid-area: category;
`;

const HorizontalLine = styled(Divider)`
  ${tw`mt-0`};
  margin: auto;
`;

export default () => (
  <Container>
    <HorizontalLine />
    dddddkjdfkjk
    <HorizontalLine />
  </Container>
);
