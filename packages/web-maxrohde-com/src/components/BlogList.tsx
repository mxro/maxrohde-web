import React from 'react';
import BlogListItem, { BlogListItemProps } from './BlogListItem';

export interface BlogListProps {
  items: BlogListItemProps[];
}

const BlogList = (props: BlogListProps): JSX.Element => {
  return (
    <>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.path} className="py-7">
              <BlogListItem {...item}></BlogListItem>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BlogList;
