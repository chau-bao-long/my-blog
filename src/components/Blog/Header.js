import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${tw`flex flex-col justify-center items-center`};
  grid-area: header;
`;

const Title = styled.h1`
  ${tw`font-semibold text-purple-dark`};
`;

const Description = styled.h5`
  ${tw`tracking-wide`};
`;

export default () => {
  const { site: { siteMetadata: { title, description } } } = useStaticQuery(query);
  return (
    <Container>
      <Title>{title}</Title>
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
