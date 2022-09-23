import React from 'react';

export interface BlogListItemProps {
  title: string;
  datePublished: string;
  tags?: string;
  path: string;
  coverImage?: string;
  summary: string;
}

interface TagItemProps {
  id: string;
}

const TagItem = (props: TagItemProps): JSX.Element => {
  return (
    <a
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      href={`/tags/${props.id}`}
    >
      {props.id}
    </a>
  );
};

/**
 * based on https://tailwind-nextjs-starter-blog.vercel.app/
 */
const BlogListItem = (props: BlogListItemProps): JSX.Element => {
  return (
    <>
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          {props.coverImage && (
            <img className="w-64" src={props.coverImage}></img>
          )}
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <a
                  className="text-gray-900 dark:text-gray-100"
                  href={`/${props.path}`}
                >
                  {props.title}
                </a>
                <span className="float-right">
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={props.datePublished}>
                      {new Date(props.datePublished).toLocaleDateString()}
                    </time>
                  </dd>
                </span>
              </h2>
              <div className="flex flex-wrap">
                {props.tags &&
                  props.tags
                    .split(',')
                    .map((tag) => <TagItem key={tag} id={tag}></TagItem>)}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {props.summary}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <a
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label='Read "New features in v1"'
              href="/blog/new-features-in-v1"
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
