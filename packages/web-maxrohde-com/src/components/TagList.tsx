import React from 'react';

export interface TagListProps {
  tags: string[];
  baseLink: string;
}

interface TagItemProps {
  id: string;
  baseLink: string;
}

const TagItem = (props: TagItemProps): JSX.Element => {
  return (
    <a
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      href={`${props.baseLink}${props.id}`}
    >
      {props.id}
    </a>
  );
};
const TagList = (props: TagListProps): JSX.Element => {
  return (
    <span className="inline-flex flex-wrap">
      {props.tags &&
        props.tags.map((tag) => (
          <TagItem key={tag} baseLink={props.baseLink} id={tag}></TagItem>
        ))}
    </span>
  );
};

export default TagList;
