import React from 'react';
import PostCard, { PostCardProps } from './PostCard';

export interface PostCardListProps {
  posts: PostCardProps[];
}

const PostCardList = (props: PostCardListProps): JSX.Element => {
  return (
    <>
      {props.posts.map((post, idx) => {
        return <PostCard key={idx} {...post}></PostCard>;
      })}
    </>
  );
};

export default PostCardList;
