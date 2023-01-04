import { Button } from 'primereact/button';
import styled from 'styled-components';
import { ProgressBar } from 'primereact/progressbar';

export const CourseCardContainer = styled.div`
  padding: 1.5rem;
  width: 20rem;
  height: 13rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 1rem;
`;

export const QuizTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 1rem;
`;

export const Description = styled.p`
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const StartCourseButton = styled(Button)`
  background: #2381fe !important;
  border: none !important;
  height: 40px;
  float: right;
  &:hover {
    transform: scale(1.05);
  }
`;

export const StartQuizButton = styled(Button)`
  background: #2381fe !important;
  border: none !important;
  height: 40px;
  width: 7.3rem;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top: 2rem;
`;

export const QuizGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  max-width: 1700px;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const QuizCardContainer = styled.div`
  padding: 1.5rem;
  width: 20rem;
  height: 13rem;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

export const SubmitButton = styled(Button)`
  background: #2381fe !important;
  border: none !important;
  height: 40px;
  margin-top: 1rem;
`;

export const FinishButton = styled(Button)`
  background: green !important;
  border: none !important;
  height: 40px;
  margin-bottom: 2rem;
`;

export const CustomProgressBar = styled(ProgressBar)`
  margin-bottom: 1rem;
  width: 50%;
`;

export const Option = styled.div`
  display: flex;
  padding: 0.3rem 0;
  align-items: center;
`;

export const OptionLabel = styled.label`
  padding-top: 0.4rem;
  padding-left: 0.5rem;
`;

export const QuizQuestion = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

export const SummaryTitle = styled.div`
  background: white;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 6px;
  width: 13rem;
  display: flex;
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
`;

export const Score = styled.p`
  padding-left: 1rem;
`;

export const SummaryItem = styled.div`
  padding: 1rem;
`;

export const Question = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
`;

export const AnswerBox = styled.div`
  margin-left: 1rem;
  padding: 0.5rem;
`;

export const Answer = styled.p`
  padding-top: 0.5rem;
`;

export const CorrectAnswer = styled.p`
  padding-top: 0.5rem;
`;

export const WrongIcon = styled.i`
  padding-right: 0.5rem;
  color: red;
`;
export const CorrectIcon = styled.i`
  padding-right: 0.5rem;
  color: green;
`;
export const OptionLetter = styled.div`
  padding-right: 0.3rem;
  padding-top: 0.4rem;
`;
export const QuizButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
