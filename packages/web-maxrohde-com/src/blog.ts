import type { BlogConfig } from 'dynamodb-blog/src/blog';

export const BLOG_CONFIG: BlogConfig = {
  blog: 'maxrohde.com',
  blogName: 'Code of Joy',
  title: 'Max Rohde&#39;s Blog - Code of Joy',
  description: 'Code and Contemplations by Max Rohde 🤗',
  creatorTwitterId: '@mxro',
  pinnedPosts: [
    '2022/10/16/serverless-react-ssr',
    '2021/11/20/the-ultimate-guide-to-typescript-monorepos',
    '2022/06/10/beginners-guide-to-dynamodb-with-node-js',
  ],
};
