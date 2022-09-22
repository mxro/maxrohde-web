import React from 'react';
import PostCardList from '../components/PostCardList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogList, { BlogListProps } from './BlogList';
import { BlogListItemProps } from './BlogListItem';

export interface IndexProps {
  posts: BlogListItemProps[];
}

const Index = (props: IndexProps): JSX.Element => {
  return (
    <>
      <Header></Header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="text-3xl font-extrabold pt-24 pb-24">Latest Posts</h1>
        <div className="pb-24">
          <BlogList items={props.posts}></BlogList>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Index;
