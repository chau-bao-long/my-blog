import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

const Container = styled.div`
  grid-area: header;
`;

const Title = styled.h1`
`;

const Description = styled.h5`
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
