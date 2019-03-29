import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import tw from 'tailwind.macro';
import Image from 'gatsby-image';

import { responsible } from '../../styles/mixins';

const Container = styled.div`
  ${tw`flex flex-col items-center py-6 rounded-lg`};
  background: white;
  margin-bottom: 2rem;
`;

const DateTime = styled.small`
  ${tw`uppercase mt-8 font-normal text-sm`};
  color: ${p => p.theme.color.grayText};
`;

const Title = styled.h3`
  ${tw`text-2xl font-bold mt-6 mb-6`};
  color: ${p => p.theme.color.blogTitle};
`;

const Content = styled.p`
  ${tw`p-12 font-light`};
  color: ${p => p.theme.color.grayText};
  font-size: 0.9rem;
`;

const Cover = styled(Image)`
  width: 100%;
`;

const Categories = styled.div`
  ${tw`text-sm font-light mb-8`};
  color: ${p => p.theme.color.category};
`;

const ReadMore = styled(Link)`
  ${tw`border py-2 px-6 font-light text-sm mb-6`};
  ${responsible};
  color: ${p => p.theme.color.grayText};
  border: 1px solid ${p => p.theme.color.grayText};
  box-shadow: none;
  &:hover {
    color: ${p => p.theme.color.grayText};
  }
`;

export default ({ node, covers }) => {
  const title = node.frontmatter.title || node.fields.slug;
  const cover = covers.find(c => (
    c.node.childImageSharp.fluid.originalName === node.frontmatter.cover
  ));
  return (
    <Container key={node.fields.slug}>
      <DateTime>{node.frontmatter.date}</DateTime>
      <Title>{title}</Title>
      <Categories>{node.frontmatter.categories}</Categories>
      { cover && <Cover fluid={cover.node.childImageSharp.fluid} /> }
      <Content
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
      <ReadMore to={node.fields.slug}>READ MORE</ReadMore>
    </Container>
  );
};
