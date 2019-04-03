import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Bio from './Bio';
import FurtherReading from './FurtherReading';
import { breakpoint } from '../../styles/mixins';

const Container = styled.div`
  ${tw`flex flex-col justify-start`};
  ${breakpoint.sm`${tw`hidden`}`};
  ${breakpoint.md`${tw`pr-8 pl-2 pt-12`}`};
  ${breakpoint.lg`${tw`pt-12 pr-12`}`};
  ${breakpoint.xl`${tw`pl-2 pr-32 pt-12`}`};
  grid-area: more;
`;

export default () => (
  <Container>
    <Bio />
    <FurtherReading />
  </Container>
);
