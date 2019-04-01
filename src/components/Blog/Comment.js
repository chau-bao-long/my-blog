import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import { color } from '../../styles/theme';
import { breakpoint } from '../../styles/mixins';

const Container = styled.section`
  ${tw`flex flex-col items-start p-6 rounded-lg`};
  ${breakpoint.md`margin: 0 1.5rem 1rem 1.5rem`}
  margin: 2rem 2rem 2rem 6rem;
  background: white;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const Title = styled.h3`
  
`;

const Divider = styled.div`
  ${tw`w-16 h-px`};
  margin-bottom: 1rem;
  background: ${color.category};
`;

const Comment = ({ comments }) => (
  <Container>
    <Title>{comments.length} Comments</Title>
    <Divider />
  </Container>
);

Comment.defaultProps = {
  comments: [],
};

export default Comment;
