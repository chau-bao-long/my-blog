import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Divider } from 'antd';
import tw from 'tailwind.macro';
import { graphql, useStaticQuery } from 'gatsby';

import useBlogState from './hooks/useBlogState';
import { color } from '../../styles/theme';

const Container = styled.div`
  grid-area: category;
  ${tw`flex flex-col justify-start items-stretch w-full`};
`;

const HorizontalLine = styled(Divider)`
  ${tw`my-0`};
`;

const CategoryGroup = styled.span`
  ${tw`flex flex-row flex-wrap justify-center my-1 w-full p-2`};
`;

const Category = styled.p`
  ${tw`inline text-sm mx-4 my-auto px-2 py-1 rounded-full hover:text-green-dark`};
  &:hover {
    color: ${color.category};
  }
  ${p => p.selected && css`
    background: ${color.category};
    color: white;
    &:hover {
      color: white;
    }
  `};
  cursor: pointer;
`;

export default () => {
  const { site: { siteMetadata: { categories } } } = useStaticQuery(query);
  const [state, setCategory] = useBlogState('categories', 'setCategory');
  const handleCategoryClick = useCallback(i => setCategory(i), [setCategory]);
  return (
    <Container>
      <HorizontalLine />
      <CategoryGroup>
        {
          categories.map((cat, i) => (
            <Category
              key={i}
              selected={state && state.pickedId === i}
              onClick={() => handleCategoryClick(i)}
            >
              {cat}
            </Category>
          ))
        }
      </CategoryGroup>
      <HorizontalLine />
    </Container>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        categories
      }
    }
  }
`;
