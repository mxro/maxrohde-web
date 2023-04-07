import React from 'react';

function Journey(): JSX.Element {
  return (
    <section className="text-gray-600 body-font bg-gradient-to-r from-white-200 to-white-300">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="sm:text-4xl text-3xl font-medium title-font text-center text-gray-900 mb-20 font-robotoslab ">
          Join our journey to
          <br className="hidden sm:block" />
        </h1>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/2 flex-grow flex sm:items-center items-start flex-col sm:flex-row">
            <img
              src="_goldstack/static/img/202304/flower-1-transparent.png"
              className="flex-shrink-0 w-24 h-24 text-black-500 rounded-full inline-flex items-center justify-center"
            ></img>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black-500 mb-1 text-3xl font-virgil">
                Be happy with less
              </h2>
            </div>
          </div>
          <div className="p-4 md:w-1/2 flex-grow flex sm:items-center items-start flex-col sm:flex-row">
            <img
              src="_goldstack/static/img/202304/heart-1-transparent.png"
              className="flex-shrink-0 w-24 h-24 text-black-500 rounded-full inline-flex items-center justify-center"
            ></img>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black-500 mb-1 text-3xl font-virgil">
                Work with purpose
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
