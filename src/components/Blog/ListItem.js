import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import tw from 'tailwind.macro';
import Image from 'gatsby-image';

import { responsible, breakpoint } from '../../styles/mixins';
import { color } from '../../styles/theme';

const Container = styled.div`
  ${tw`flex flex-col items-center py-6 rounded-lg m-12`};
  ${breakpoint.sm`${tw`m-3`}`}
  ${breakpoint.md`${tw`ml-3 mb-6`}`}
  background: white;
  margin: 0 0 2rem 3.5rem;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const DateTime = styled.small`
  ${tw`uppercase mt-8 font-normal text-sm`};
  color: ${color.grayText};
`;

const Title = styled.h3`
  ${tw`text-2xl font-bold mt-6 mb-6 px-3 text-center`};
  color: ${color.blogTitle};
`;

const Content = styled.p`
  ${tw`font-light p-3 sm:p-8 md:p-12`};
  color: ${color.grayText};
  font-size: 0.9rem;
`;

const Cover = styled(Image)`
  width: 100%;
`;

const Categories = styled.div`
  ${tw`text-sm font-light mb-8`};
  color: ${color.category};
`;

const ReadMoreBtn = styled(Link)`
  ${tw`border rounded-full py-2 px-6 font-light text-sm mb-6`};
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
      <ReadMoreBtn to={node.fields.slug}>READ MORE</ReadMoreBtn>
    </Container>
  );
};
