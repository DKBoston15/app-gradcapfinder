import React, { useState } from 'react';
import {
  Container,
  QuizGridContainer,
  FinishButton,
  SubmitButton,
  CustomProgressBar,
  Option,
  OptionLabel,
  QuizQuestion,
  SummaryTitle,
  Score,
  Question,
  Answer,
  CorrectAnswer,
  SummaryItem,
  AnswerBox,
  WrongIcon,
  CorrectIcon,
  OptionLetter,
} from './styles';
import { useCourseStore } from '@app/stores/courseStore';
import QuizCard from './QuizCard';

export default function QuizGrid({ selectedCourse, courseTitle }) {
  const { courses, updateCourse } = useCourseStore((state) => ({
    courses: state.courses,
    updateCourse: state.updateCourse,
  }));
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const selectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuiz(true);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const removeHTML = (html: string): string => {
    // Create a new div element
    const div = document.createElement('div');
    // Set the HTML of the div to the input HTML string
    div.innerHTML = html;
    // Return the text content of the div
    return div.textContent || div.innerText || '';
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  function combineStrings(strings: any) {
    if (strings.length === 0) {
      return '';
    } else if (strings.length === 1) {
      return strings[0];
    } else if (strings.length === 2) {
      return strings[0] + ' or ' + strings[1];
    } else {
      let result = '';
      for (let i = 0; i < strings.length - 1; i++) {
        result += strings[i] + ', ';
      }
      result += 'or ' + strings[strings.length - 1];
      return result;
    }
  }

  const handleAnswer = () => {
    let isCorrect;
    if (selectedQuiz.questions[currentQuestionIndex].multiAnswer) {
      isCorrect =
        selectedOption !== null &&
        selectedQuiz.questions[currentQuestionIndex].multiAnswer.includes(
          removeHTML(selectedQuiz.questions[currentQuestionIndex].options[selectedOption]),
        );
    } else {
      isCorrect =
        selectedOption !== null &&
        removeHTML(selectedQuiz.questions[currentQuestionIndex].options[selectedOption]) ===
          selectedQuiz.questions[currentQuestionIndex].answer;
    }

    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswers([
      ...selectedAnswers,
      {
        question: selectedQuiz.questions[currentQuestionIndex].question,
        selectedOption: selectedQuiz.questions[currentQuestionIndex].options[selectedOption],
        answer: selectedQuiz.questions[currentQuestionIndex].multiAnswer
          ? combineStrings(selectedQuiz.questions[currentQuestionIndex].multiAnswer)
          : selectedQuiz.questions[currentQuestionIndex].answer,
        isCorrect: isCorrect,
      },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
  };

  const checkIfAllCorrect = (questions: any[]): boolean => {
    return questions.every((question) => question.isCorrect === true);
  };

  const finishQuiz = async () => {
    // Headers & Footers Score is not updating correctly
    const course = courses.find((course) => course.title === courseTitle);

    let newQuizResults = course.quiz_results;

    const existingQuizIndex = newQuizResults.findIndex(
      (quiz) => quiz.selectedQuiz === selectedQuiz.title,
    );

    if (existingQuizIndex !== -1) {
      // Replace the existing quiz in the array
      newQuizResults = [
        ...newQuizResults.slice(0, existingQuizIndex),
        {
          allCorrect: checkIfAllCorrect(selectedAnswers),
          score: score,
          totalQuestions: selectedQuiz.questions.length,
          selectedQuiz: selectedQuiz.title,
          selectedAnswers,
        },
        ...newQuizResults.slice(existingQuizIndex + 1),
      ];
    } else {
      // Add the new quiz to the array
      newQuizResults = [
        ...newQuizResults,
        {
          allCorrect: checkIfAllCorrect(selectedAnswers),
          score: score,
          totalQuestions: selectedQuiz.questions.length,
          selectedQuiz: selectedQuiz.title,
          selectedAnswers,
        },
      ];
    }
    await updateCourse(course.id, course.title, course.completed, newQuizResults);
    setCurrentQuestionIndex(0);
    setShowQuiz(false);
    setSelectedAnswers([]);
    setScore(0);
  };

  return (
    <Container>
      {!showQuiz && (
        <QuizGridContainer>
          {selectedCourse.quizzes.map((quiz) => (
            <QuizCard
              courses={courses}
              courseTitle={courseTitle}
              quiz={quiz}
              selectQuiz={selectQuiz}
              key={quiz.title}
            />
          ))}
        </QuizGridContainer>
      )}
      {showQuiz && (
        <div className="quiz">
          {currentQuestionIndex < selectedQuiz.questions.length ? (
            <>
              <CustomProgressBar
                value={currentQuestionIndex * selectedQuiz.questions.length}
                color={'#2381fe'}
              />
              <QuizQuestion>{selectedQuiz.questions[currentQuestionIndex].question}</QuizQuestion>
              {Object.keys(selectedQuiz.questions[currentQuestionIndex].options).map(
                (option, index) => (
                  <Option key={index}>
                    <OptionLetter>{option}.</OptionLetter>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    <OptionLabel
                      dangerouslySetInnerHTML={{
                        __html: selectedQuiz.questions[currentQuestionIndex].options[option],
                      }}
                    />
                  </Option>
                ),
              )}
              <SubmitButton disabled={!selectedOption} onClick={() => handleAnswer()}>
                Submit
              </SubmitButton>
            </>
          ) : (
            <div className="quiz-summary">
              <SummaryTitle>
                Quiz Summary{' '}
                <Score>
                  {score} / {selectedQuiz.questions.length}
                </Score>
              </SummaryTitle>
              {selectedQuiz.questions.map((question, index) => {
                const response = selectedAnswers.find(
                  (answer) => answer.question === question.question,
                );
                return (
                  <SummaryItem key={index} className="quiz-result">
                    <Question>
                      {response.isCorrect ? (
                        <CorrectIcon className="pi pi-check-circle" />
                      ) : (
                        <WrongIcon className="pi pi-exclamation-circle" />
                      )}
                      {question.question}
                    </Question>
                    <AnswerBox>
                      <Answer>
                        <strong>Your answer:</strong> {response.selectedOption}
                      </Answer>
                      {!response.isCorrect && (
                        <CorrectAnswer>
                          <strong>Correct answer:</strong> {response.answer}
                        </CorrectAnswer>
                      )}
                    </AnswerBox>
                  </SummaryItem>
                );
              })}
              <FinishButton label="Finish" onClick={() => finishQuiz()} />
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
