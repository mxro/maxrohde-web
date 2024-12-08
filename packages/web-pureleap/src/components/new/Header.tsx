// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      className="text-center py-10 bg-white"
      style={{ backgroundColor: '#fbfbff' }}
    >
      <img
        src="/_goldstack/static/img/202412/pureleap_logo.png"
        alt="Pureleap Logo"
        className="mx-auto"
        style={{ width: '675px' }}
      />
      <h1 className="text-xl font-bold mt-4">Big dreams? Busy days?</h1>
      <h1 className="text-xl font-bold mt-4">
        Let’s help you chill while you conquer.
      </h1>
    </header>
  );
};

export default Header;
