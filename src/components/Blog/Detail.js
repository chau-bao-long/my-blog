import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import tw from 'tailwind.macro';
import Image from 'gatsby-image';

import { color } from '../../styles/theme';
import { responsible, breakpoint } from '../../styles/mixins';

const Container = styled.div`
  grid-area: main;
  ${tw`flex flex-col items-center py-6 rounded-lg`};
  ${breakpoint.md`${tw`mx-6 my-8`}`}
  background: white;
  margin: 3rem 2rem 1rem 6rem;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const Categories = styled.div`
  ${tw`text-sm font-light mb-6`};
  color: ${color.category};
`;

const Time = styled.p`
  ${tw`uppercase mt-8 font-normal text-sm`};
  color: ${color.grayText};
`;

const Title = styled.h1`
  ${tw`text-3xl font-bold mt-3 mb-6 text-center py-3 px-6`};
  color: ${color.blogTitle};
`;

const Content = styled.div`
  ${tw`font-light w-full`};
  ${breakpoint.xl`max-width: 60rem;`}
  ${breakpoint.lg`max-width: 50rem; padding: 3rem;`}
  ${breakpoint.md`max-width: 45rem; padding: 2.5rem;`}
  ${breakpoint.sm`max-width: 50rem; padding: 2rem;`}
  ${breakpoint.xs`padding: 2rem;`}
  ${breakpoint.xxs`padding: 1rem;`}
  color: ${color.grayText};
  font-size: 0.9rem;
`;

const Cover = styled(Image)`
  width: 100%;
`;

const List = styled.ul`
  width: 85%;
  list-style-type: none;
  padding: 0;
`;

const buttonStyle = css`
  ${tw`border rounded-full font-light text-sm mb-6 py-2 sm:px-6 md:px-2 text-center`};
  ${responsible};
  color: ${color.grayText};
  border: 1px solid ${color.grayText};
  box-shadow: none;
  &:hover {
    color: white;
    background: ${color.category};
    border: 1px solid ${color.category};
  }
`;

const PrevBlog = styled.li`
  float: left;
  ${buttonStyle};
`;

const NextBlog = styled.li`
  float: right;
  ${buttonStyle};
`;

const BlogLink = styled(Link)`
  ${tw`py-4 px-6`};
  color: ${color.grayText};
  box-shadow: none;
  &:hover {
    color: white;
  }
`;

export default ({ post, cover, previous, next }) => (
  <Container>
    <Time>{post.frontmatter.date}</Time>
    <Title>{post.frontmatter.title}</Title>
    <Categories>{post.frontmatter.categories}</Categories>
    { cover && <Cover fluid={cover.childImageSharp.fluid} /> }
    <Content dangerouslySetInnerHTML={{ __html: post.html }} />
    <List>
      {
        previous && (
          <PrevBlog>
            <BlogLink to={`blogs${previous.fields.slug}`} rel="prev">
              ←
              {' '}
              {previous.frontmatter.title}
            </BlogLink>
          </PrevBlog>
        )
      }
      {
        next && (
          <NextBlog>
            <BlogLink to={`blogs${next.fields.slug}`} rel="next">
              {next.frontmatter.title}
              {' '}
              →
            </BlogLink>
          </NextBlog>
        )
      }
    </List>
  </Container>
);
