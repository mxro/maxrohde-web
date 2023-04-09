import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BlogList from 'dynamodb-blog/src/components/BlogList';
import type { IndexProps } from 'dynamodb-blog';
import PageHeading from '../PageHeading';

const Index = (props: IndexProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      {props.firstPage && (
        <PageHeading
          heading="Blog"
          description="You can find all our published articles here."
        ></PageHeading>
      )}
      <section className="bg-white-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-24 ">
          {props.firstPage && (
            <>
              <h1 className="text-3xl font-extrabold font-robotoslab pt-12 pb-12">
                Featured Articles
              </h1>
              <div className="">
                <BlogList items={props.pinnedPosts}></BlogList>
              </div>
            </>
          )}
          <h1 className="text-3xl font-extrabold font-robotoslab pt-12 pb-12">
            {props.firstPage ? 'Latest Posts' : 'Posts'}
          </h1>
          <div className="pb-24">
            <BlogList items={props.posts}></BlogList>
            {props.lastTimestamp && (
              <a href={`?loadFrom=${props.lastTimestamp}`}>Load more →</a>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Index;
