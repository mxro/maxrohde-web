import React from 'react';

const HeaderDesktop = (): JSX.Element => {
  return (
    <div className="hidden sm:block mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <img
              className="h-16 w-16 rounded-full"
              src="/_goldstack/static/img/2022/10/max.jpg"
              alt="Max Rohde portrait"
            />
          </a>
        </div>

        <nav className="space-x-10 flex">
          <a href="/">
            <span className="sr-only">Shalveena Rohde</span>
            <h1 className="text-2xl">Shalveena Rohde</h1>
          </a>
          <h2 className="text-sm align-bottom" style={{ marginTop: '0.75rem' }}>
            My Blog
          </h2>
        </nav>
        <div className="hidden items-center justify-end md:flex sm:flex-1 md:w-0">
          <a
            href="/about"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            About
          </a>
        </div>
      </div>
    </div>
  );
};

const HeaderMobile = (): JSX.Element => {
  return (
    <div className="sm:hidden">
      <div className="px-5 pt-5 pb-6">
        <div className="flex items-center justify-between">
          <a href="/">
            <img
              className="h-16 w-16 rounded-full"
              src="/_goldstack/static/img/2022/10/max.jpg"
              alt="Max Rohde portrait"
            />
          </a>
          <nav className="space-x-10 flex">
            <a href="/">
              <span className="sr-only">Code of Joy</span>
              <h1 className="text-2xl">Code of Joy</h1>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

/**
 * Based on https://tailwindui.com/components/marketing/elements/headers
 */
const Header = (): JSX.Element => {
  return (
    <>
      <div className="relative bg-white">
        <HeaderDesktop />
        <HeaderMobile />
      </div>
    </>
  );
};

export default Header;
