import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import tw from 'tailwind.macro';
import Image from 'gatsby-image';

import { color } from '../../styles/theme';

const Container = styled(Link)`
  ${tw`flex flex-col items-stretch py-6 m-8 rounded-lg`};
  background: white;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const Title = styled.h3`
  ${tw`text-lg font-medium mt-6 self-start`};
  color: ${color.category};
`;

const Cover = styled(Image)`
  width: 100%;
`;

const Content = styled.p`
  ${tw`font-light`};
  color: ${color.grayText};
  font-size: 0.9rem;
`;

export default ({ node, covers }) => {
  const title = node.frontmatter.title || node.fields.slug;
  const cover = covers.find(c => (
    c.node.childImageSharp.fluid.originalName === node.frontmatter.cover.base
  ));
  return (
    <Container key={node.fields.slug} to={node.fields.slug}>
      { cover && <Cover fluid={cover.node.childImageSharp.fluid} /> }
      <Title>{title}</Title>
      <Content
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />
    </Container>
  );
};
