import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${tw`flex flex-col items-center py-6 rounded-lg`};
  background: white;
  margin: 2rem 3rem 0 0;
`;

const Title = styled.h3`
  ${tw`font-bold text-xl p-4`};
`;

const Divider = styled.div`
  ${tw`w-16 h-px`};
  margin-bottom: 1rem;
  background: ${p => p.theme.color.category};
`;

export default () => (
  <Container>
    <Title>Further Reading</Title>
    <Divider />
  </Container>
);
