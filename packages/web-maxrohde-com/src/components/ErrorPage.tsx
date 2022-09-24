import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export interface ErrorPageProps {
  message: string;
}

const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold pt-24 pb-24">
          Something Went Wrong 🤔
        </h1>
        <p>{props.message}</p>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ErrorPage;
