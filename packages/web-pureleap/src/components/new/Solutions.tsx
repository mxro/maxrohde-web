// src/components/Solutions.tsx
import React from 'react';

const solutions = [
  {
    image: '/_goldstack/static/img/202412/flat_screen.png',
    title: 'Coding You’ll Love',
    description:
      'Building software should be a joy, not a chore. Our tools turn complex challenges into seamless fun.',
  },
  {
    image: '/_goldstack/static/img/202412/tea_cup.png',
    title: 'Life, Simplified',
    description:
      'Life’s too short not to enjoy it. We help you find health, joy, and peace.',
  },
  {
    image: '/_goldstack/static/img/202412/notebook.jpg',
    title: 'Chill Productivity',
    description:
      'Forget burnout. Work smarter, deliver better, and feel good doing it.',
  },
];

const Solutions: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8">
        What we make solutions for
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {solutions.map((solution, index) => (
          <div key={index} className="max-w-sm text-center">
            <img
              src={solution.image}
              alt={solution.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-medium mb-2">{solution.title}</h3>
            <p className="text-gray-600">{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Solutions;
