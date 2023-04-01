import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 bg-orange bg-opacity-30 backdrop-filter backdrop-blur-md z-10 transition-all duration-500 ease-in-out">
      <div className="text-black font-gruppo font-bold text-4xl">pureleap</div>{' '}
      <img
        className="text-inline w-30"
        src="/_goldstack/static/img/202304/pureleap_black.svg"
      ></img>
      <nav className="flex items-center justify-end">
        <a
          href="#"
          className="text-black text-xl mx-4 font-robotoslab font-bold hover:text-gray-300"
        >
          About
        </a>
        <a
          href="#"
          className="text-black text-xl font-bold font-robotoslab mx-4 hover:text-gray-300"
        >
          Blog
        </a>
      </nav>
    </header>
  );
}

export default Header;
