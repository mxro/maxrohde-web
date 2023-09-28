import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BlogList from 'dynamodb-blog/src/components/BlogList';
import type { IndexProps } from 'dynamodb-blog';

import styles from './IndexPage.module.css';

const IndexPage = (props: IndexProps): JSX.Element => {
  console.log('render it');
  return (
    <>
      <div className={styles.background}>
        <Header></Header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
          {props.firstPage && (
            <>
              <h1 className="text-3xl font-extrabold pt-12 pb-12">Pinned</h1>
              <div className="">
                <BlogList items={props.pinnedPosts}></BlogList>
              </div>
            </>
          )}
          <h1
            className="text-3xl font-extrabold pt-12 pb-12"
            onClick={() => {
              console.log('hi');
            }}
          >
            {props.firstPage ? 'Latest Posts' : 'Posts'}
          </h1>
          <div className="pb-24">
            <BlogList items={props.posts}></BlogList>
            {props.lastTimestamp && (
              <a href={`?loadFrom=${props.lastTimestamp}`}>Load more →</a>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default IndexPage;
