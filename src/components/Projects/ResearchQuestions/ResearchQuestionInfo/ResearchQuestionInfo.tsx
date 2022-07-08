import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useResearchQuestionsStore } from '../../../../stores/researchQuestionsStore';
import { InputTextarea } from 'primereact/inputtextarea';
import './styles.css';
import { useParams } from 'react-router-dom';
export default function ResearchQuestionInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const { research_questions, patchResearchQuestion } = useResearchQuestionsStore((state) => ({
    research_questions: state.research_questions,
    patchResearchQuestion: state.patchResearchQuestion,
  }));

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [question6, setQuestion6] = useState('');
  const [question7, setQuestion7] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = research_questions.filter(
      (research_question) => research_question.id == selectedItem,
    );
    if (newSelectedItem) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setQuestion1(newSelectedItem[0].question_1);
      setQuestion2(newSelectedItem[0].question_2);
      setQuestion3(newSelectedItem[0].question_3);
      setQuestion4(newSelectedItem[0].question_4);
      setQuestion5(newSelectedItem[0].question_5);
      setQuestion6(newSelectedItem[0].question_6);
      setQuestion7(newSelectedItem[0].question_7);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    // setSaving(true);
    await patchResearchQuestion(
      id,
      title,
      link,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
    );
    // setTimeout(() => {
    //   setSaving(false);
    // }, 500);
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
          <div>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="title"
                value={title || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setTitle(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <LinkContainer>
              <LinkInput className="p-float-label">
                <InputText
                  style={{ width: '100%' }}
                  id="link"
                  value={link || ''}
                  onChange={(e) => {
                    // @ts-ignore
                    setLink(e.target.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="link">Link</label>
              </LinkInput>
              <i
                className="pi pi-external-link"
                onClick={() => window.open(link, '_blank')}
                style={{
                  fontSize: '1.5em',
                  paddingBottom: '0.2em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question1"
                rows={3}
                value={question1 || ''}
                onChange={(e) => {
                  setQuestion1(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question1">Question 1</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question2"
                rows={3}
                value={question2 || ''}
                onChange={(e) => {
                  setQuestion2(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question2">Question 2</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question3"
                rows={3}
                value={question3 || ''}
                onChange={(e) => {
                  setQuestion3(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question3">Question 3</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question4"
                rows={3}
                value={question4 || ''}
                onChange={(e) => {
                  setQuestion4(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question4">Question 4</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question5"
                rows={3}
                value={question5 || ''}
                onChange={(e) => {
                  setQuestion5(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question5">Question 5</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question6"
                rows={3}
                value={question6 || ''}
                onChange={(e) => {
                  setQuestion6(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question6">Question 6</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputTextarea
                id="question7"
                rows={3}
                value={question7 || ''}
                onChange={(e) => {
                  setQuestion7(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="question7">Question 7</label>
            </CustomInput>
          </div>
        </div>
      )}
    </>
  );
}
