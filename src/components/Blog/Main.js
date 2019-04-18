import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import tw from 'tailwind.macro';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ListItem from './ListItem';
import useCategoryFilter from './hooks/useCategoryFilter';
import { breakpoint } from '../../styles/mixins';

const Container = styled.div`
  ${tw`py-12 px-16 sm:px-6`};
  ${breakpoint.xxs`${tw`px-0`}`}
  ${breakpoint.xl`${tw`pl-32`}`}
  grid-area: main;
`;

const socialQuery = gql`
  query getSocials {
    socialInfos {
      commentCount
      viewCount
      blogId
    }
  }
`;

export default () => {
  const {
    coverFiles: { edges: covers }, allMarkdownRemark: { edges: posts },
  } = useStaticQuery(postQuery);
  const filteredPosts = useCategoryFilter(posts);
  return (
    <Query query={socialQuery}>
      {({ data }) => (
        <Container>
          {
            filteredPosts.map(({ node }) => {
              let socialInfo;
              if (data && data.socialInfos && data.socialInfos.length) {
                socialInfo = data.socialInfos.find(d => d.blogId === node.fields.slug);
              }
              return <ListItem key={node.frontmatter.date} node={node} covers={covers} socialInfo={socialInfo} />;
            })
          }
        </Container>
      )}
    </Query>
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
