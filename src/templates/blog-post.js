import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Blog/Layout';
import Detail from '../components/Blog/Detail';

class BlogPostTemplate extends React.Component {
  render() {
    const {
      data: {
        markdownRemark: post,
      },
      pageContext: {
        previous,
        next,
      },
    } = this.props;

    return (
      <Layout>
        <Detail post={post} previous={previous} next={next} />
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
