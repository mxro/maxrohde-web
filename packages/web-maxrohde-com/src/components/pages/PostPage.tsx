import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { TagList } from 'dynamodb-blog';

import type { Post as PostType } from 'db-blog';
import ErrorPage from './ErrorPage';

export interface PostProps {
  post?: PostType;
  visits: number;
  exists: boolean;
}

const PostPage = (props: PostProps): JSX.Element => {
  if (!props.post) {
    return <ErrorPage message="Post does not exist"></ErrorPage>;
  }
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  return (
    <>
      <Header></Header>

      <div className="flex flex-row container mx-auto relative bg-white md:pt-16 pb-8 max-w-7xl px-4 sm:px-6">
        <div className="basis-4/5 px-4 sm:px-6 max-w-full">
          <article className={'prose lg:prose-xl border-b border-gray-300'}>
            <h1>{props.post.title}</h1>
            {props.post.canonicalUrl && (
              <div className="text-sm pl-2">
                Originally published on{' '}
                <a href={props.post.canonicalUrl}>{props.post.canonicalUrl}</a>.
              </div>
            )}
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
        <div className="hidden md:block basis-1/5">
          <p className="pt-24">
            Insights for developing lean applications with ease 😎 and my
            musings on life and leadership ✍.
          </p>

          <div className="pt-8 text-center">
            <a
              href="/about"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              🤗 Follow
            </a>
          </div>

          <h3 className="pt-8 font-medium leading-tight text-xl mt-0 mb-2">
            Blog Stats
          </h3>
          <p>{hydrated ? props.visits.toLocaleString() : props.visits} views</p>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PostPage;
