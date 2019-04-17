import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Icon as IconAnt } from 'antd';

const Container = styled.div`
  ${tw`w-full flex justify-end align-center px-2`};
`;

const Text = styled.p`
  ${tw`pl-1 pr-6 text-pink-light`};
  font-size: 1rem;
`;

const Icon = styled(IconAnt)`
  ${tw`text-pink-light`};
  margin-top: 4px;
  font-size: 1.1rem;
`;

const EyeIcon = styled(Icon)`
  margin-top: 2px;
  font-size: 1.3rem;
`;

export default ({ socialInfo }) => (
  <Container>
    <Icon type="message" />
    <Text>{socialInfo && socialInfo.commentCount ? socialInfo.commentCount : 0}</Text>
    <EyeIcon type="eye" />
    <Text>{socialInfo && socialInfo.viewCount ? socialInfo.viewCount : 0}</Text>
  </Container>
);
