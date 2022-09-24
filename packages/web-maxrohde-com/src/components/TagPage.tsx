import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogList from './BlogList';
import { BlogListItemProps } from './BlogListItem';

export interface TagProps {
  id: string;
  posts: BlogListItemProps[];
  nextToken?: string;
}

const TagPage = (props: TagProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold pt-24 pb-12">
          {props.id} - Posts
        </h1>
        <div className="pb-24">
          <BlogList items={props.posts}></BlogList>
          {props.nextToken && (
            <a href={`?nextToken=${props.nextToken}`}>Load more →</a>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default TagPage;
