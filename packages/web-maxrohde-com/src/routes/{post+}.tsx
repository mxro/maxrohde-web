import React, { useState } from 'react';
// import { SSRHandler } from '@goldstack/template-ssr';

import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from 'aws-lambda';
type SSRHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

import { renderPage, hydrate } from '../render';
import styles from './$index.module.css';

export interface PostProps {
  path: string;
}

const Post = (props: PostProps): JSX.Element => {
  return (
    <>
      <article className="prose lg:prose-xl">
        <h1>Greedy Path Garlic bread with cheese: What the science tells us</h1>
        <p>{props.path}</p>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: SSRHandler = async (event, context) => {
  return renderPage<PostProps>({
    component: Post,
    appendToHead:
      '<title>Max Rohde&#39;s Blog - Code &amp; Contemplations</title>',
    properties: {
      path: event.rawPath,
    },
    entryPoint: __filename,
    event: event,
  });
};

hydrate(Post);

export default Post;
