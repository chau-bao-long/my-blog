import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Bio from './Bio';

const Container = styled.div`
  ${tw`flex justify-center`};
  grid-area: more;
`;

export default () => (
  <Container>
    <Bio />
  </Container>
);
