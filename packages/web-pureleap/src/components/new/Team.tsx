// src/components/Team.tsx
import React from 'react';

const team = [
  {
    name: 'Max Rohde',
    role: 'chief chill officer',
    description:
      'Passionate coder, former lecturer, and corporate veteran now full-time wanna-be chill dude.',
    links: { linkedin: '#', x: '#' },
  },
  {
    name: 'Shally',
    role: 'the boss',
    description:
      'Ex-lawyer turned software engineer, making sure no corners are cut.',
    links: { linkedin: '#', x: '#' },
  },
];

const Team: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-8">Who we are</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, index) => (
          <div key={index} className="max-w-sm text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-gray-500 italic mb-4">{member.role}</p>
            <p className="text-gray-600">{member.description}</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href={member.links.linkedin}
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={member.links.x}
                className="text-blue-500 hover:underline"
              >
                X.com
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
