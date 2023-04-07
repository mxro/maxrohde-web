import React from 'react';

function Services(): JSX.Element {
  return (
    <section className="pt-24 bg-gradient-to-r from-orange-200 to-orange-400">
      <div className="max-w-3xl mx-auto text-center font-robotoslab ">
        <h1 className="h2 mb-4 sm:text-4xl text-3xl">
          What we{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-700">
            share
          </span>
        </h1>
      </div>
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-orange-300 rounded">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="Video"
                className="object-cover object-center w-full h-full block"
                src="https://images.unsplash.com/photo-1501631259223-89d4e246ed23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHwxMHx8Y291cGxlfGVufDB8MHx8fDE2Nzk3ODg0MjE&ixlib=rb-4.0.3&q=80&w=1080"
              />
            </a>
            <div className="mt-4">
              <h2 className="text-gray-900 title-font text-lg font-medium font-virgil">
                Video: Our Journey
              </h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-orange-300 rounded">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="podcast"
                className="object-cover object-center w-full h-full block"
                src="https://images.unsplash.com/photo-1619490287893-862fd1808407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHwzMHx8bWljcm9waG9uZXxlbnwwfDB8fHwxNjgwODI2OTM4&ixlib=rb-4.0.3&q=80&w=1080"
              />
            </a>
            <div className="mt-4">
              <h2 className="text-gray-900 title-font text-lg font-medium font-virgil">
                Code of Joy Podcast
              </h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-orange-300 rounded">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="recipes"
                className="object-cover object-center w-full h-full block"
                src="https://images.unsplash.com/photo-1535041422672-8c3254ab3abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHwyOXx8dmVnZXRhYmxlc3xlbnwwfDB8fHwxNjgwODI3MDI3&ixlib=rb-4.0.3&q=80&w=1080"
              />
            </a>
            <div className="mt-4">
              <h2 className="text-gray-900 title-font text-lg font-medium font-virgil">
                Mindful Recipes
              </h2>
            </div>
          </div>
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-orange-300 rounded">
            <a className="block relative h-48 rounded overflow-hidden">
              <img
                alt="articles"
                className="object-cover object-center w-full h-full block"
                src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjAwOTd8MHwxfHNlYXJjaHwyMHx8bGlicmFyeXxlbnwwfDB8fHwxNjgwODI3MTk4&ixlib=rb-4.0.3&q=80&w=1080"
              />
            </a>
            <div className="mt-4">
              <h2 className="text-gray-900 title-font text-lg font-medium font-virgil">
                Inspiring Articles
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
