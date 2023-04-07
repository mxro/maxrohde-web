import React from 'react';

export interface ServiceCardProps {
  img: string;
  title: string;
  link: string;
}

function ServiceCard(props: ServiceCardProps): JSX.Element {
  return (
    <a
      className="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-orange-300 rounded cursor-pointer"
      href={props.link}
    >
      <div className="block relative h-48 rounded overflow-hidden">
        <img
          alt={props.title}
          className="object-cover object-center w-full h-full block"
          src={props.img}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-gray-900 title-font text-lg font-medium font-virgil">
          {props.title}
        </h2>
      </div>
    </a>
  );
}

export default ServiceCard;
