import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Bio from './Bio';
import FurtherReading from './FurtherReading';

const Container = styled.div`
  ${tw`flex flex-col justify-start`};
  grid-area: more;
  margin: 3rem 6rem 2rem 0;
`;

export default () => (
  <Container>
    <Bio />
    <FurtherReading />
  </Container>
);
