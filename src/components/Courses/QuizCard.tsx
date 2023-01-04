import React, { useState, useEffect } from 'react';
import {
  QuizCardContainer,
  StartQuizButton,
  QuizTitle,
  QuizButtonContainer,
  CorrectIcon,
} from './styles';

export default function QuizCard(props) {
  const [quizResults, setQuizResults] = useState();

  const getQuizResults = (quizTitle: string) => {
    const course = props.courses.find((course) => course.title === props.courseTitle);
    const quiz = course.quiz_results.find((quiz) => quiz.selectedQuiz === quizTitle);
    setQuizResults(quiz);
  };

  useEffect(() => {
    getQuizResults(props.quiz.title);
  }, []);

  return (
    <>
      {props.quiz && (
        <QuizCardContainer>
          <div>
            <QuizTitle>{props.quiz.title}</QuizTitle>
            {quizResults && !quizResults.allCorrect && (
              <div
                style={{
                  fontSize: '1.2em',
                }}>
                Score: {quizResults.score}/{quizResults.totalQuestions}
              </div>
            )}
            {quizResults && quizResults.allCorrect && (
              <div>
                <CorrectIcon
                  className="pi pi-check-circle"
                  style={{
                    fontSize: '3em',
                    marginLeft: '12rem',
                    marginTop: '-1rem',
                  }}
                />
              </div>
            )}
          </div>
          <QuizButtonContainer>
            <StartQuizButton onClick={() => props.selectQuiz(props.quiz)}>
              Start Quiz
            </StartQuizButton>
          </QuizButtonContainer>
        </QuizCardContainer>
      )}
    </>
  );
}
