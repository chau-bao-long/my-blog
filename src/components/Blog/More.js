import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Bio from './Bio';
import FurtherReading from './FurtherReading';
import { breakpoint } from '../../styles/mixins';

const Container = styled.div`
  ${tw`flex flex-col justify-start`};
  ${breakpoint.sm`${tw`hidden`}`};
  ${breakpoint.md`${tw`mr-8 ml-2 mt-8`}`};
  ${breakpoint.xl`${tw`mr-8 ml-2 mt-8 pr-32 pt-4`}`};
  grid-area: more;
  margin: 3rem 6rem 2rem 0;
`;

export default () => (
  <Container>
    <Bio />
    <FurtherReading />
  </Container>
);
