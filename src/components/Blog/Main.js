import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import tw from 'tailwind.macro';

import ListItem from './ListItem';

const Container = styled.div`
  ${tw`py-12 px-16`};
  grid-area: main;
`;

export default () => {
  const {
    coverFiles: { edges: covers }, allMarkdownRemark: { edges: posts },
  } = useStaticQuery(postQuery);
  return (
    <Container>
      {
        posts.map(({ node }) => (
          <ListItem key={node.frontmatter.date} node={node} covers={covers} />
        ))
      }
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
            cover
            categories
          }
        }
      }
    }
    coverFiles: allFile(filter: {absolutePath: {regex: "/cover-(.)+.jpg/"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 700, quality: 100) {
              ...GatsbyImageSharpFluid,
              originalName
            }
          }
        }
      }
    }
  }
`;
