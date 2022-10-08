import React from 'react';

/**
 * Based on https://tailwindui.com/components/marketing/elements/headers
 */
const Header = (): JSX.Element => {
  return (
    <>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Code of Joy</span>
                <img
                  className="h-16 w-16 rounded-full"
                  src="/_goldstack/static/img/2022/09/max.jpg"
                  alt="Max Rohde portrait"
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden space-x-10 md:flex">
              <a href="/">
                <h1 className="text-2xl">Code of Joy</h1>
              </a>
              <h2
                className="text-sm align-bottom"
                style={{ marginTop: '0.75rem' }}
              >
                Code &amp; Contemplations by Max Rohde
              </h2>
            </nav>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <a
                href="/about"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>Code of Joy</div>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="/about"
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
