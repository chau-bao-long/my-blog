import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';

import ListItem from './ListItem';

const Container = styled.div`
  grid-area: main;
`;

export default () => {
  const { allMarkdownRemark: { edges: posts } } = useStaticQuery(postQuery);
  return (
    <Container>
      { posts.map(({ node }) => <ListItem key={node.frontmatter.date} node={node} />) }
    </Container>
  );
};

export const postQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
