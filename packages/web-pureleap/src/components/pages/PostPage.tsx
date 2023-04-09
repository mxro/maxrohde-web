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
      <div
        style={{
          background: `url('${props.post.coverImage}') no-repeat top/100%, linear-gradient(90deg, rgba(255,118,66,1) 0%, rgba(255,72,0,1) 100%)`,
        }}
        className={'flex mt-24'}
      >
        <Header></Header>
        <div className="flex flex-row container mx-auto relative bg-white-300 opacity-95 mt-24 pb-8 mb-24 max-w-7xl rounded-[24px]">
          <div className="basis-full md:basis-3/5 px-4 pt-12 sm:px-6 ">
            <article className="prose lg:prose-xl border-b border-gray-300 ">
              <h1 className="font-robotoslab">{props.post.title}</h1>
              {props.post.canonicalUrl && (
                <div className="text-sm pl-2">
                  Originally published on{' '}
                  <a href={props.post.canonicalUrl}>
                    {props.post.canonicalUrl}
                  </a>
                  .
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
          <div className="hidden md:block max-w-full basis-2/5 ">
            <div className="pt-32 pl-24 fixed">
              <div>
                <div className="pl-12 pb-6">
                  <img
                    className="h-32"
                    src="/_goldstack/static/img/202304/shally_and_max.png"
                  ></img>
                </div>
                <p className="font-virgil text-lg">
                  Thank you for stopping by our blog.
                </p>
                <p className="font-virgil text-lg pt-6">
                  Join us on our journey<br></br>
                  <img
                    className="inline h-8"
                    src="/_goldstack/static/img/202304/flower-1-transparent.png"
                  ></img>{' '}
                  to be happy with less and<br></br>
                  <img
                    className="inline h-8"
                    src="/_goldstack/static/img/202304/heart-1-transparent.png"
                  ></img>{' '}
                  work with purpose.
                </p>
                <p className="font-virgil text-lg pt-6">
                  <a className="underline" href="/">
                    Learn more
                  </a>
                </p>
                <h3 className="pt-8 font-medium leading-tight text-xl mt-0 mb-2 font-robotoslab">
                  Blog Stats
                </h3>
                <p className="font-virgil text-lg">
                  {hydrated ? props.visits.toLocaleString() : props.visits}{' '}
                  views
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PostPage;
