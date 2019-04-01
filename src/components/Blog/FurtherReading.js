import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { graphql, useStaticQuery } from 'gatsby';

import FurtherItem from './FurtherItem';
import { color } from '../../styles/theme';

const Container = styled.div`
  ${tw`flex flex-col items-center py-6 rounded-lg`};
  background: white;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const Title = styled.h3`
  ${tw`font-bold text-xl p-4`};
`;

const Divider = styled.div`
  ${tw`w-16 h-px`};
  margin-bottom: 1rem;
  background: ${color.category};
`;

export default () => {
  const {
    coverFiles: { edges: covers }, allMarkdownRemark: { edges: posts },
  } = useStaticQuery(postQuery);
  return (
    <Container>
      <Title>Further Reading</Title>
      <Divider />
      {
        posts.map(({ node }) => (
          <FurtherItem key={node.frontmatter.date} node={node} covers={covers} />
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
            cover {
              base
            }
            categories
          }
        }
      }
    }
    coverFiles: allFile(filter: {absolutePath: {regex: "/cover-(.)+.(jpg|png)/"}}) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid,
              originalName
            }
          }
        }
      }
    }
  }
`;
