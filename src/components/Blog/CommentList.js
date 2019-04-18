import React from 'react';
import { Comment, Tooltip, List } from 'antd';

const defaultAvatarUrl = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';

const buildData = comments => (
  comments.map(comment => ({
    actions: [<span key={comment.commentId}>Reply to</span>],
    author: comment.author,
    avatar: defaultAvatarUrl,
    content: (
      <p>{comment.content}</p>
    ),
    datetime: (
      <Tooltip title={comment.createdAt}>
        <span>{comment.createdAt}</span>
      </Tooltip>
    ),
  }))
);

export default ({ comments }) => (
  <List
    className="comment-list"
    itemLayout="horizontal"
    dataSource={comments ? buildData(comments) : []}
    renderItem={item => (
      <Comment
        actions={item.actions}
        author={item.author}
        avatar={item.avatar}
        content={item.content}
        datetime={item.datetime}
      />
    )}
  />
);
