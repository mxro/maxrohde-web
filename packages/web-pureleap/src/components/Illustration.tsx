import React from 'react';
import IllustrationList from './IllustrationList';

export interface IllustrationProps {
  img: string;
  caption: string;
  showContent: boolean;
}

function Illustration(props: IllustrationProps): JSX.Element {
  return (
    <section className="text-gray-600 body-font bg-gradient-to-r from-orange-400 to-orange-500">
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded h-96"
            alt={props.caption}
            src={props.img}
          ></img>
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 font-robotoslab ">
            {props.caption}
            <br className="hidden lg:inline-block"></br>
          </h1>
          {props.showContent && <IllustrationList></IllustrationList>}
          {/* <p className="mb-8 leading-relaxed font-robotoslab">
            We have been there, done that.
          </p> */}
        </div>
      </div>
    </section>
  );
}

export default Illustration;
