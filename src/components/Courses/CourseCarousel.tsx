import React from 'react';
import { Carousel } from 'primereact/carousel';
import CourseCard from './CourseCard';

const courses = [
  {
    title: 'APA Style (7th ed.)',
    description: 'Course designed to measure your understanding of common elements in APA.',
    location: '/knowledge_base/courses/apa',
  },
];

export default function CourseCarousel() {
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const courseTemplate = (course) => {
    return <CourseCard course={course} />;
  };

  return (
    <div className="carousel-demo" style={{ paddingTop: '1rem' }}>
      <div className="card">
        <Carousel
          value={courses}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={courseTemplate}
          showNavigators={false}
          showIndicators={false}
        />
      </div>
    </div>
  );
}
