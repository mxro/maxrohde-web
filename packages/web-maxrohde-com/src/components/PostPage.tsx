import React from 'react';
import { PostProps } from '../routes/{post+}';
import Footer from './Footer';
import Header from './Header';

const PostPage = (props: PostProps): JSX.Element => {
  if (!props.post) {
    return <>Post does not exist.</>;
  }
  return (
    <>
      <Header></Header>

      <div className="relative bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <article className="prose lg:prose-xl">
            <h1>{props.post.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}
            ></div>
          </article>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PostPage;
