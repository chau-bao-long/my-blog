import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin } from 'antd';

import { color } from '../../styles/theme';
import { breakpoint } from '../../styles/mixins';
import CommentList from './CommentList';
import CommentBox from './CommentBox';

const Container = styled.section`
  ${tw`flex flex-col items-start p-6 rounded-lg`};
  ${breakpoint.md`margin: 0 1.5rem 1rem 1.5rem`}
  ${breakpoint.xxs`margin: 0`}
  margin: 2rem 2rem 2rem 6rem;
  background: white;
  box-shadow: 0px 1px 1px rgba(0,0,0,0.03);
`;

const Title = styled.h3`
`;

const Loading = styled(Spin)`
  ${tw`ml-4`};
`;

const Divider = styled.div`
  ${tw`w-16 h-px`};
  margin-bottom: 1rem;
  background: ${color.category};
`;

const commentQuery = gql`
  query getComments($blogId: ID!) {
    comments(blogId: $blogId) {
      author
      content
      blogId
      commentId
      createdAt
    }
  }
`;

const Comment = ({ blogId }) => (
  <Query query={commentQuery} variables={{ blogId }}>
    {({ data, loading }) => (
      <Container>
        <Title>
          {data && data.comments && data.comments.length} Comments
          {loading && <Loading />}
        </Title>
        <Divider />
        <CommentList comments={data && data.comments} />
        <CommentBox blogId={blogId} />
      </Container>
    )}
  </Query>
);

export default Comment;
