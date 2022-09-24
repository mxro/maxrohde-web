import React from 'react';

export interface PostCardProps {
  coverImage: string;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="border-2 border-gray-200 rounded-lg">
        <img
          className="object-cover object-center w-full lg:h-48 md:h-36"
          src={props.coverImage}
          alt="blog"
        />
        <div className="p-6">
          <span className="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-indigo-800 bg-indigo-200 rounded">
            Category
          </span>
          <h1 className="mb-2 text-lg font-medium text-gray-900">The Title</h1>
          <p className="mb-2 text-sm tracking-wide text-gray-700">
            Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
            microdosing tousled waistcoat.
          </p>
          <div className="flex items-center ">
            <a className="inline-flex items-center text-indigo-500 cursor-pointer md:mb-2 lg:mb-0">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
