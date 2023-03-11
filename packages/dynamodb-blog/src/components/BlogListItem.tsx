import React from 'react';
import TagList from './TagList';

export interface BlogListItemProps {
  title: string;
  datePublished: string;
  tags?: string;
  path: string;
  coverImage?: string;
  summary: string;
}

/**
 * based on https://tailwind-nextjs-starter-blog.vercel.app/
 */
const BlogListItem = (props: BlogListItemProps): JSX.Element => {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  return (
    <>
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-start xl:space-y-0">
        <div className="xl:col-span-1">
          {props.coverImage && (
            <img loading="lazy" className="w-64" src={props.coverImage}></img>
          )}
        </div>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <a className="text-gray-900" href={`/${props.path}`}>
                  {props.title}
                </a>
                <span className="float-right">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 ">
                    <time dateTime={props.datePublished}>
                      {hydrated
                        ? new Date(props.datePublished).toLocaleDateString()
                        : new Date(props.datePublished).toUTCString()}
                    </time>
                  </dd>
                </span>
              </h2>
              {props.tags && (
                <TagList
                  baseLink="/tags/"
                  tags={props.tags?.split(',')}
                ></TagList>
              )}
            </div>
            <div className="prose max-w-none text-gray-500">
              {props.summary}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <a
              className="text-primary-500 hover:text-primary-600"
              aria-label="Read more"
              href={`/${props.path}`}
            >
              Read more →
            </a>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogListItem;
