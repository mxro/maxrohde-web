import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import BlogList from 'dynamodb-blog/src/components/BlogList';
import type { IndexProps } from 'dynamodb-blog';

const Content = () => (
  <div className="prose">
    <p>Hi 👋 I’m Shalveena Rohde:</p>
    <ul>
      <li>Lawyer → a software developer! 👩🏽‍💻</li>
      <li>Love learning 🤓</li>
      <li>Eternally curious</li>
      <li>
        Writing at 💻 <a href="https://medium.com/@shalveena">Medium</a> and
        here on my <a href="https://shalveena.com">personal blog</a>
      </li>
      <li>
        Find me on 🙌{' '}
        <a href="https://www.linkedin.com/in/shalveena-rohde/">LinkedIn</a> /{' '}
        <a href="https://www.instagram.com/shally_travels/">Instagram</a> /{' '}
        <a href="https://twitter.com/shalveena_rohde">Twitter</a>
      </li>
      <img
        src="_goldstack/static/img/2023/03/img_2165.webp"
        alt="Shalveena on a hike"
      ></img>
    </ul>
  </div>
);

const Index = (props: IndexProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12">
        {props.firstPage && <Content />}
        {props.firstPage && (
          <>
            <h1 className="text-3xl font-extrabold pt-12 pb-12">Pinned</h1>
            <div className="">
              <BlogList items={props.pinnedPosts}></BlogList>
            </div>
          </>
        )}
        <h1 className="text-3xl font-extrabold pt-12 pb-12">
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
    </>
  );
};

export default Index;
