import React from 'react';

export function Hero(): JSX.Element {
  return (
    <section
      className="relative bg-cover bg-center bg-fixed h-screen"
      style={{
        backgroundImage:
          "url('/_goldstack/static/img/202303/pexels-marko-blazevic-3373183.jpg')",
      }}
      // https://unsplash.com/photos/3YrppYQPoCI
    >
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold font-robotoslab text-center mb-48 mr-64 p-12 bg-black bg-opacity-70 rounded-lg">
          A better way to live and work.
        </h1>
      </div>
    </section>
  );
}

export default Hero;
