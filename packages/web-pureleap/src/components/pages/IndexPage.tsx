import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BlogList from 'dynamodb-blog/src/components/BlogList';
import type { IndexProps } from 'dynamodb-blog';

const Index = (props: IndexProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      {props.firstPage && (
        <section className="text-gray-600 body-font bg-orange-500 mt-24">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium font-robotoslab mb-2 text-black">
                  Blog
                </h1>
                <div className="h-1 w-20 bg-black-500 rounded"></div>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed text-black font-sans text-xl pt-6">
                Follow our blog to stay up to date with all of our writing.
              </p>
            </div>
          </div>
        </section>
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
