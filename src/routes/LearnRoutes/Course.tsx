import React, { useEffect, useState } from 'react';
import quizzes from '@app/constants/quizzes';
import QuizGrid from '@app/components/Courses/QuizGrid';

const findQuizByCourseTitle = (courseTitle: string): any => {
  for (const quiz of quizzes) {
    if (quiz.courseTitle === courseTitle) {
      return quiz;
    }
  }
  return null;
};

export default function Course({ course, courseTitle }) {
  const [selectedQuiz, setSelectedQuiz] = useState();

  useEffect(() => {
    setSelectedQuiz(findQuizByCourseTitle(course));
  }, []);

  return (
    <>{selectedQuiz && <QuizGrid selectedCourse={selectedQuiz} courseTitle={courseTitle} />}</>
  );
}
