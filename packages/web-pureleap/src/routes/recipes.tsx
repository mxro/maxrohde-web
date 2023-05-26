import { SSRHandler } from '@goldstack/template-ssr';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { hydrate, renderPage } from '../render';

const Recipes = (): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg">
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl ">
          About
        </h1>
        <div className="mx-auto mt-14">
          <p>A journey to explore new ways of living and working.</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPage({
    component: Recipes,
    appendToHead: '<title>Real Food Recipes</title>',
    properties: {},
    entryPoint: __filename,
    event,
  });
};

hydrate(Recipes);

export default Recipes;
