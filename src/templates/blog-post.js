import React from 'react';
import { graphql } from 'gatsby';
import tw from 'tailwind.macro';
import styled from 'styled-components';

import Layout from '../components/Blog/Layout';
import Detail from '../components/Blog/Detail';
import Comment from '../components/Blog/Comment';

const Container = styled.div`
  grid-area: main;
  ${tw`flex flex-col justify-start`};
`;

class BlogPostTemplate extends React.Component {
  render() {
    const {
      data: {
        markdownRemark: post,
        cover,
      },
      pageContext: {
        previous,
        next,
      },
    } = this.props;
    return (
      <Layout detail>
        <Container>
          <Detail post={post} cover={cover} previous={previous} next={next} />
          <Comment />
        </Container>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $cover: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        categories
      }
    }
    cover: file(relativePath: {eq: $cover}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid,
          originalName
        }
      }
    }
  }
`;
