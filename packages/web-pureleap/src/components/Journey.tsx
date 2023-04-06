import React from 'react';

function Journey(): JSX.Element {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20 font-robotoslab">
          Join is in our journey to learn how to
          <br className="hidden sm:block" />
        </h1>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 md:w-1/2 flex-grow flex sm:items-center items-start flex-col sm:flex-row">
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
            {/* <div className="w-24 h-24 flex-shrink items-center justify-center rounded-full mb-4 flex-shrink-0">
              <img
                src="_goldstack/static/img/202304/flower-1-transparent.png"
                className="flex-shrink-0 w-24 h-24 text-black-500 rounded-full inline-flex items-center justify-center"
              ></img>
            </div>
            <div className="flex-grow pl-6">
              <h2 className="text-black-500 text-2xl title-font font-medium mb-2 font-virgil">
                Be happy and healthy with less.
              </h2>
            </div> */}
          </div>
          <div className="p-4 md:w-1/2 flex">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <div className="flex-grow pl-6">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                The Catalyzer
              </h2>
              <p className="leading-relaxed text-base">
                Blue bottle crucifix vinyl post-ironic four dollar toast vegan
                taxidermy. Gastropub indxgo juice poutine, ramps microdosing
                banh mi pug VHS try-hard ugh iceland kickstarter tumblr
                live-edge tilde.
              </p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;
