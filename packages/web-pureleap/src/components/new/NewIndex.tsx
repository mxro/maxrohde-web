import React from 'react';
import Header from './Header';
import Solutions from './Solutions';
import Team from './Team';
import Contact from './Contact';

export const NewIndex: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <Solutions />
      <Team />
      <Contact />
    </div>
  );
};
