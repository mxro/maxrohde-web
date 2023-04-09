import React from 'react';

function IllustrationList(): JSX.Element {
  return (
    // <section className="text-gray-600 body-font bg-gradient-to-r from-white-500 to-orange-500">
    <section className="text-gray-600 body-font pt-12">
      <div className="container px-5 py-4 mx-auto flex flex-wrap">
        <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 ">
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img
              src="_goldstack/static/img/202304/flower-1-transparent.png"
              className="flex-shrink-0 w-24 h-24 text-black-500 rounded-full inline-flex items-center justify-center"
            ></img>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black-500 mb-1 text-2xl font-virgil">
                Be happy and healthy with less.
              </h2>
              {/* <p className="leading-relaxed">
                VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk
                bespoke try-hard cliche palo santo offal.
              </p> */}
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 ">
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img
              src="_goldstack/static/img/202304/heart-1-transparent.png"
              className="flex-shrink-0 w-24 h-24 text-black-500 rounded-full inline-flex items-center justify-center"
            ></img>

            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-black-500 mb-1 text-2xl font-virgil">
                Work with purpose.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IllustrationList;
