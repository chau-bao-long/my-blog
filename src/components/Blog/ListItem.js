import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { rhythm } from '../../utils/typography';

const BlogLink = styled(Link)`
  boxShadow: 'none';
`;

export default ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug;
  return (
    <div key={node.fields.slug}>
      <h3
        style={{
          marginBottom: rhythm(1 / 4),
        }}
      >
        <BlogLink to={node.fields.slug}>
          {title}
        </BlogLink>
      </h3>
      <small>{node.frontmatter.date}</small>
      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </div>
  );
};
