import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../components/Blog/Layout';
import Detail from '../components/Blog/Detail';
import Comment from '../components/Blog/Comment';

const Container = styled.div`
  grid-area: main;
  ${tw`flex flex-col justify-start`};
`;

const BlogDetail = ({ viewBlog, ...rest }) => {
  useEffect(() => {
    viewBlog({ variables: { blogId: rest.id, userAgent: navigator.userAgent, viewAt: new Date() } });
  }, [viewBlog, rest.id]);
  return (
    <Layout detail>
      <Container>
        <Detail {...rest} />
        <Comment blogId={rest.id} />
      </Container>
    </Layout>
  );
};

const viewBlogQL = gql`
  mutation view($blogId: ID!, $userAgent: String!, $viewAt: String!) {
    view(blogId: $blogId, userAgent: $userAgent, viewAt: $viewAt) {
      blogId
      userAgent
      viewAt
    }
  }
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
        slug,
      },
    } = this.props;
    return (
      <Mutation mutation={viewBlogQL}>
        {viewBlog => (
          <BlogDetail id={slug} viewBlog={viewBlog} post={post} cover={cover} previous={previous} next={next} />
        )}
      </Mutation>
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
