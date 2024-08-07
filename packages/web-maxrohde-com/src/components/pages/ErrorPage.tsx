import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import type { ErrorPageProps } from 'dynamodb-blog';

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold pt-24 pb-24">
          {props.message} 🤔
        </h1>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
