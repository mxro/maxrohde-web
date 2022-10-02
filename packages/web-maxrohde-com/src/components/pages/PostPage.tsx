import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import TagList from '../TagList';

import type { Post as PostType } from 'db-blog';

export interface PostProps {
  post?: PostType;
  visits: number;
  exists: boolean;
}

const PostPage = (props: PostProps): JSX.Element => {
  if (!props.post) {
    return <>Post does not exist.</>;
  }
  return (
    <>
      <Header></Header>

      <div className="flex flex-row container mx-auto relative bg-white pt-16 pb-8 max-w-7xl px-4 sm:px-6">
        <div className="basis-4/5 px-4 sm:px-6">
          <article className={'prose lg:prose-xl border-b border-gray-300'}>
            <h1>{props.post.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: props.post.contentHtml }}
            ></div>
          </article>
          {props.post.tags && (
            <div className="pt-8">
              <span className="text-sm inline-block w-28">Tags: </span>
              <TagList
                baseLink="/tags/"
                tags={props.post.tags?.split(',')}
              ></TagList>
            </div>
          )}
          {props.post.categories && (
            <div className="pt-2">
              <span className="text-sm inline-block w-28">Categories: </span>
              <TagList
                baseLink="/categories/"
                tags={props.post.categories?.split(',')}
              ></TagList>
            </div>
          )}
        </div>
        <div className="basis-1/5">
          <h3 className="pt-36 font-medium leading-tight text-xl mt-0 mb-2">
            About
          </h3>
          <p className="pt-4">
            Insights for developing lean applications with ease 💻 and my
            musings on life and leadership ✍.
          </p>
          <p className="pt-4">Come and say hi or follow me:</p>
          <ul className="pt-4">
            <li>
              <a
                href="https://dev.to/mxro"
                className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 485 512"
                  className="inline w-7 h-7"
                >
                  <path
                    fill="#000000"
                    d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"
                  ></path>
                </svg>{' '}
                <span className="">dev.to/mxro</span>
              </a>
            </li>
            <li className="pt-4">
              <a
                href="https://dev.to/mxro"
                className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 248 204"
                  className="inline w-7 h-7"
                >
                  <path
                    fill="#1d9bf0"
                    d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
                  />
                </svg>{' '}
                <span className="">@mxro</span>
              </a>
            </li>
            <li className="pt-4">
              <a
                href="https://mxro.medium.com/"
                className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="inline w-7 h-7"
                >
                  <rect
                    xmlns="http://www.w3.org/2000/svg"
                    width="512"
                    height="512"
                    rx="15%"
                    fill="#12100e"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    d="M125 173c0-4-2-9-5-11l-31-38v-6h98l75 166 67-166h93v6l-27 26c-2 1-3 4-3 7v190c0 3 1 6 3 8l27 25v6H289v-6l27-26c3-3 3-4 3-8V193l-76 192h-10l-88-192v129c-1 5 1 11 5 15l35 43v5H85v-5l35-43c4-4 6-10 5-15z"
                  />
                </svg>{' '}
                <span className="">mxro.medium.com</span>
              </a>
            </li>
            <li className="pt-4">
              <a
                href="https://www.linkedin.com/in/maxrohde/"
                className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 382 382"
                  className="inline w-7 h-7"
                >
                  <path
                    fill="#0077B7"
                    d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
	C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
	H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806
	c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
	s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
	c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
	c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
	c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
	L341.91,330.654L341.91,330.654z"
                  />
                </svg>{' '}
                <span className="">maxrohde</span>
              </a>
            </li>
          </ul>
          <h3 className="pt-8 font-medium leading-tight text-xl mt-0 mb-2">
            Blog Stats
          </h3>
          <p>{props.visits.toLocaleString()} views</p>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default PostPage;
