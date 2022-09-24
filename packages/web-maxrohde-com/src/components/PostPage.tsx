import React from 'react';
import { PostProps } from '../routes/{post+}';
import Footer from './Footer';
import Header from './Header';
import TagList from './TagList';

const PostPage = (props: PostProps): JSX.Element => {
  if (!props.post) {
    return <>Post does not exist.</>;
  }
  return (
    <>
      <Header></Header>

      <div className="relative bg-white pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <article className="prose lg:prose-xl border-b border-gray-300">
            <h1>{props.post.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}
            ></div>
          </article>
          {props.post.tags && (
            <div className="pt-8">
              <TagList tags={props.post.tags?.split(',')}></TagList>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PostPage;
