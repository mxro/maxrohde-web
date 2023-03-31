import React from 'react';

export function Hero(): JSX.Element {
  return (
    <section
      className="bg-cover bg-center bg-fixed h-screen"
      style={{
        backgroundImage:
          "url('/_goldstack/static/img/202303/guillaume-galtier-3YrppYQPoCI-unsplash.jpg')",
      }}
      // https://unsplash.com/photos/3YrppYQPoCI
    >
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-5xl font-bold text-center">
          A better way to live and work.
        </h1>
      </div>
    </section>
  );
}

export default Hero;
