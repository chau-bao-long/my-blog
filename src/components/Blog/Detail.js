import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Time = styled.p`
`;

const Title = styled.h1`
`;

const Content = styled.div`
`;

const List = styled.ul`
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-between';
  list-style: 'none';
  padding: 0;
`;

const Item = styled.li`
`;

export default ({ post, previous, next }) => (
  <>
    <Title>{post.frontmatter.title}</Title>
    <Time>{post.frontmatter.date}</Time>
    <Content dangerouslySetInnerHTML={{ __html: post.html }} />
    <List>
      <Item>
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ←
            {' '}
            {previous.frontmatter.title}
          </Link>
        )}
      </Item>
      <Item>
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title}
            {' '}
            →
          </Link>
        )}
      </Item>
    </List>
  </>
);
