import React from 'react';

export interface TagListProps {
  tags: string[];
}

interface TagItemProps {
  id: string;
}

const TagItem = (props: TagItemProps): JSX.Element => {
  return (
    <a
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      href={`/tags/${props.id}`}
    >
      {props.id}
    </a>
  );
};
const TagList = (props: TagListProps): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {props.tags &&
        props.tags.map((tag) => <TagItem key={tag} id={tag}></TagItem>)}
    </div>
  );
};

export default TagList;
