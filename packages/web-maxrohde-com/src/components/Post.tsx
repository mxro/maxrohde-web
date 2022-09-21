import React from 'react';
import { PostProps } from '../routes/{post+}';

const Post = (props: PostProps): JSX.Element => {
  if (!props.post) {
    return <>Post does not exist.</>;
  }
  return (
    <>
      <article className="prose lg:prose-xl">
        <h1>{props.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}></div>
      </article>
    </>
  );
};

export default Post;
