import React from 'react';
import Footer from './Footer';
import Header from './Header';
import TagList from './TagList';

import type { Post as PostType } from 'db-blog';
export interface PostProps {
  post?: PostType;
  exists: boolean;
}

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
              <span className="text-sm inline-block w-28">Tags: </span>
              <TagList
                baseLink="/tags/"
                tags={props.post.tags?.split(',')}
              ></TagList>
            </div>
          )}
          {props.post.categories && (
            <div className="pt-2">
              <span className="text-sm inline-block w-28">Categories: </span>
              <TagList
                baseLink="/categories/"
                tags={props.post.categories?.split(',')}
              ></TagList>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PostPage;
