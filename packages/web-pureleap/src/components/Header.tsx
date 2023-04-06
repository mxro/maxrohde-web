import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 bg-orange bg-opacity-30 backdrop-filter backdrop-blur-md z-10 transition-all duration-500 ease-in-out">
      {/* <div className="text-black font-slabo font-bold text-4xl">pureleap</div>{' '} */}
      <img
        className="h-12"
        src="/_goldstack/static/img/202304/pureleap_logo_black_bg_transparent.png"
      ></img>
      <nav className="flex items-center justify-end">
        <a
          href="#"
          className="text-black text-xl mx-4 font-virgil hover:text-orange-500"
        >
          about
        </a>
        <a
          href="#"
          className="text-black text-xl font-virgil mx-4 hover:text-orange-500"
        >
          blog
        </a>
      </nav>
    </header>
  );
}

export default Header;
