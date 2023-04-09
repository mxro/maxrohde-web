import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BlogList from 'dynamodb-blog/src/components/BlogList';
import type { TagProps } from 'dynamodb-blog';
import PageHeading from '../PageHeading';

const TagPage = (props: TagProps): JSX.Element => {
  return (
    <>
      <Header></Header>

      {!props.nextToken && (
        <PageHeading heading={`${props.caption}${props.id}`}></PageHeading>
      )}
      <section className="bg-white-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24">
          <div className="pb-24">
            <BlogList items={props.posts}></BlogList>
            {props.nextToken && (
              <a href={`?nextToken=${props.nextToken}`}>Load more →</a>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default TagPage;
