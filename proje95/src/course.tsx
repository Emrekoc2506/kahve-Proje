import React from 'react';

export interface CourseProps {
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    imageSrc?: string;
  };
}

const Course: React.FC<CourseProps> = ({ course }) => {
  const { title, description, image, category, price } = course;

  return (
    <div className='course'>
      <div>
        <img src={image} alt={title} />
        <h4>{title}</h4>
        <h5>{description}</h5>
        <p>kategori : {category} </p>
        <p>fiyat :{price} </p>
      </div>
    </div>
  );
};

export default Course;
