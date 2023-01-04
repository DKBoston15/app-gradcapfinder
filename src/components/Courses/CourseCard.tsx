import { useCourseStore } from '@app/stores/courseStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCardContainer, Title, StartCourseButton, Description } from './styles';

export default function CourseCard({ course }) {
  const { addCourse, getCourseByTitle } = useCourseStore((state) => ({
    addCourse: state.addCourse,
    getCourseByTitle: state.getCourseByTitle,
  }));
  const navigate = useNavigate();

  const addNewCourse = async () => {
    const dbCourse = await getCourseByTitle(course.title);
    if (dbCourse.length === 0) {
      await addCourse(course.title, false, []);
    }
    navigate(course.location);
  };

  return (
    <CourseCardContainer>
      <Title>{course.title}</Title>
      <Description>{course.description}</Description>
      <StartCourseButton onClick={() => addNewCourse()}>Start</StartCourseButton>
    </CourseCardContainer>
  );
}
