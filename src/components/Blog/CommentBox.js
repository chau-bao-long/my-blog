import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Avatar, Form, Button, Input, Comment as CommentAnt } from 'antd';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const defaultAvatarUrl = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const AuthorItem = styled(Form.Item)`
  margin-bottom: 10px;
`;

const Comment = styled(CommentAnt)`
  ${tw`w-full pr-6`};
`;

const Editor = ({
  onContentChange, onAuthorChange, onSubmit, submitting, content, author,
}) => (
  <>
    <AuthorItem>
      <Input placeholder="Your email or name" rows={1} onChange={onAuthorChange} value={author} />
    </AuthorItem>
    <Form.Item>
      <Input.TextArea placeholder="Your idea on this blog" rows={5} onChange={onContentChange} value={content} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const createCommentQL = gql`
  mutation createComment($blogId: ID!, $author: String!, $content: String!, $createdAt: String!) {
    comment(blogId: $blogId, author: $author, content: $content, createdAt: $createdAt) {
      blogId
      author
      content
      commentId
      createdAt
    }
  }
`;

const commentQL = gql`
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

export default ({ blogId }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const handleSubmit = useCallback(createComment => {
    if (content && author) createComment({ variables: { blogId, author, content, createdAt: new Date().toDateString() } });
  }, [content, author, blogId]);
  return (
    <Mutation
      mutation={createCommentQL}
      update={(cache, { data }) => {
        setContent('');
        setAuthor('');
        const { comments } = cache.readQuery({ query: commentQL, variables: { blogId } });
        cache.writeQuery({
          query: commentQL,
          data: { comments: comments.concat(data.comment) },
          variables: { blogId },
        });
      }}
    >
      {(createComment, { loading }) => (
        <Comment
          avatar={(
            <Avatar src={defaultAvatarUrl} alt="Avatar" />
          )}
          content={(
            <Editor
              onContentChange={e => setContent(e.target.value)}
              onAuthorChange={e => setAuthor(e.target.value)}
              onSubmit={() => handleSubmit(createComment)}
              submitting={loading}
              content={content}
              author={author}
            />
          )}
        />
      )}
    </Mutation>
  );
};
