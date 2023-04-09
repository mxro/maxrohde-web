import React from 'react';

export interface PageHeadingProps {
  heading: string;
  description?: string;
}

function PageHeading(props: PageHeadingProps): JSX.Element {
  return (
    <section className="text-gray-600 body-font bg-orange-500 mt-24">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium font-robotoslab mb-2 text-black">
              {props.heading}
            </h1>
            <div className="h-1 w-20 bg-black-500 rounded"></div>
          </div>
          {props.description && (
            <p className="lg:w-1/2 w-full leading-relaxed text-black font-sans text-xl pt-6">
              {props.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHeading;
