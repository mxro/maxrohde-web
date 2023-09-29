import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import type { PostProps } from 'dynamodb-blog';
import TagList from 'dynamodb-blog/src/components/TagList';

import ErrorPage from './ErrorPage';
import Sidebar from '../Sidebar';
import Background from '../Background';

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
      <Background></Background>
      <div className="absolute z-1">
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
              label="utterance-comment"
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
          <Sidebar
            viewCount={
              hydrated ? props.visits.toLocaleString() : `${props.visits}`
            }
          ></Sidebar>
        </div>

        <Footer></Footer>
      </div>
    </>
  );
};

export default PostPage;
