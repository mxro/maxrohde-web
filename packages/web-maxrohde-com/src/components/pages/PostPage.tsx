import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import type { PostProps } from 'dynamodb-blog';
import TagList from 'dynamodb-blog/src/components/TagList';

import ErrorPage from './ErrorPage';

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
            <img
              className="hidden md:block"
              style={{ maxHeight: '36rem' }}
              src={props.post.coverImage}
            ></img>
            <h1>{props.post.title}</h1>
            <div className="text-sm pl-2">
              by Max Rohde,{' '}
              <time dateTime={props.post.datePublished}>
                {hydrated
                  ? new Date(props.post.datePublished).toLocaleDateString()
                  : new Date(props.post.datePublished).toUTCString()}
              </time>
              {props.post.canonicalUrl && (
                <span>
                  , originally published on{' '}
                  <a href={props.post.canonicalUrl}>
                    {props.post.canonicalUrl}
                  </a>
                  .
                </span>
              )}
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}
            ></div>
          </article>
          <div
            style={{ maxWidth: '65ch', fontSize: '1.25rem' }}
            dangerouslySetInnerHTML={{
              __html: `
          <script
              src="https://utteranc.es/client.js"
              repo="mxro/maxrohde-web"
              issue-term="pathname"
              theme="github-light"
              crossOrigin="anonymous"
              async
            ></script>
          `,
            }}
          ></div>
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
