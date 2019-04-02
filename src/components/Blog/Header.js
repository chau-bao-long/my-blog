import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import tw from 'tailwind.macro';

import { color } from '../../styles/theme';

const Container = styled.div`
  ${tw`flex flex-col justify-center items-center`};
  grid-area: header;
`;

const Title = styled(Link)`
  ${tw`font-serif text-4xl font-semibold text-purple-dark m-4`};
  &:hover { color: ${color.category} }
  box-shadow: none;
`;

const Description = styled.h5`
  ${tw`tracking-wide mx-3 text-center`};
`;

export default () => {
  const { site: { siteMetadata: { title, description } } } = useStaticQuery(query);
  return (
    <Container>
      <Title to="/">{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
