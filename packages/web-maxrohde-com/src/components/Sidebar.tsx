import React from 'react';

import Medium from './../icons/Medium';
import Twitter from './../icons/Twitter';
import DevTo from './../icons/DevTo';
import LinkedIn from './../icons/LinkedIn';

const Sidebar = (props: { viewCount: string }): JSX.Element => {
  return (
    <>
      <div className="hidden md:block basis-1/4">
        <div className="container">
          <div
            className={
              'relative z-10 overflow-hidden rounded bg-white py-12 px-8'
            }
          >
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4">
                <span className="mb-2 text-base text-black">
                  Connect with me 🤗
                </span>
              </div>
              <div className="w-full px-4 pt-8 pb-8">
                <div className="flex flex-col ">
                  <a
                    href="https://medium.com/@mxro"
                    className={
                      'my-1 cursor-pointer block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90'
                    }
                  >
                    <Medium></Medium> · mxro (tech articles)
                  </a>

                  <a
                    href="https://medium.com/@maxcontemplates"
                    className={
                      'my-1 cursor-pointer block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90'
                    }
                  >
                    <Medium></Medium> · maxcontemplates
                  </a>
                  <a
                    href="https://twitter.com/mxro"
                    className={
                      'my-1 cursor-pointer block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90'
                    }
                  >
                    <Twitter></Twitter> · mxro
                  </a>
                  <a
                    href="https://dev.to/mxro"
                    className={
                      'my-1 cursor-pointer block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90'
                    }
                  >
                    <DevTo></DevTo> · mxro
                  </a>
                  <a
                    href="https://www.linkedin.com/in/maxrohde/"
                    className={
                      'my-1 cursor-pointer block rounded bg-white py-4 px-6 text-base font-medium text-black transition hover:bg-opacity-90'
                    }
                  >
                    <LinkedIn></LinkedIn> · maxrohde
                  </a>
                </div>
              </div>
            </div>
            <div>
              <span className="absolute top-0 left-0 z-[-1]">
                <svg
                  width={189}
                  height={162}
                  viewBox="0 0 189 162"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx={16}
                    cy="-16.5"
                    rx={173}
                    ry="178.5"
                    transform="rotate(180 16 -16.5)"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1={-157}
                      y1="-107.754"
                      x2="98.5011"
                      y2="-106.425"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.07" />
                      <stop offset={1} stopColor="white" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="absolute bottom-0 right-0 z-[-1]">
                <svg
                  width={191}
                  height={208}
                  viewBox="0 0 191 208"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx={173}
                    cy="178.5"
                    rx={173}
                    ry="178.5"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="-3.27832e-05"
                      y1="87.2457"
                      x2="255.501"
                      y2="88.5747"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="black" stopOpacity="0.7" />
                      <stop offset={1} stopColor="black" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
            <p>{props.viewCount} views</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
