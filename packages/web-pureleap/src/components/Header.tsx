import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 bg-white bg-opacity-0 backdrop-filter backdrop-blur-md z-10 transition-all duration-500 ease-in-out">
      <div className="text-sportyblue font-bold text-xl">Pureleap</div>
      <nav className="flex items-center justify-end">
        <a href="#" className="text-sportyblue mx-4 hover:text-gray-300">
          About
        </a>
        <a href="#" className="text-sportyblue mx-4 hover:text-gray-300">
          Blog
        </a>
      </nav>
    </header>
  );
}

export default Header;
