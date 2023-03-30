import React from 'react';

export function Video(): JSX.Element {
  return (
    <section className="pt-20 pb-20 bg-gradient-to-r from-rose-50 via-red-100 to-teal-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-10">
        <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1501631259223-89d4e246ed23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHwxMHx8Y291cGxlfGVufDB8MHx8fDE2Nzk3ODg0MjE&ixlib=rb-4.0.3&q=80&w=1080"
            alt=""
            className="w-full h-full object-cover object-center rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 w-full md:pl-10">
          <div className="text-black font-bold text-xl mb-2">Our Story</div>
          <p className="text-black mb-6">
            We&apos;ve worked in different careers. We lived in different
            countries. We explore how to live simpler, work with joy and make a
            difference.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#fff"
              width="24px"
              height="24px"
            >
              <path d="M14.018 10L6.5 15.856V4.144L14.018 10z" />
            </svg>
            <span className="ml-2">Play Video</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Video;
