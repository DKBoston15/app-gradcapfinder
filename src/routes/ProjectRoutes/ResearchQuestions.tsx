import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/research_questions.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewResearchQuestionForm from '../../components/Projects/ResearchQuestions/AddResearchQuestionForm/NewResearchQuestionForm';
import { useResearchQuestionsStore } from '../../stores/researchQuestionsStore';
import ResearchQuestionInfo from '../../components/Projects/ResearchQuestions/ResearchQuestionInfo/ResearchQuestionInfo';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';

const options = {
  keys: ['title'],
};

export default function ResearchQuestions({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const getResearchQuestions = useResearchQuestionsStore(
    (state: any) => state.getResearchQuestions,
  );
  const research_questions = useResearchQuestionsStore((state: any) => state.research_questions);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteResearchQuestion = useResearchQuestionsStore(
    (state: any) => state.deleteResearchQuestion,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await getResearchQuestions(selectedProject);
    };
    getData();
  }, []);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (research_questions.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const researchQuestionId = searchParams.get('researchQuestionId');
        if (research_questions && researchQuestionId) {
          const filteredResearchQuestion = research_questions.filter(
            (research_question: any) => research_question.id == researchQuestionId,
          );
          setSelectedItem(filteredResearchQuestion[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, research_questions]);

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    setLoading(false);
  }, [research_questions]);

  const handleDeletion = () => {
    setSelectedItem(research_questions[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={research_questions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Research Questions"
            searchQueryTitle="researchQuestionId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Research Question">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteResearchQuestion}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Research Question"
                buttonLabel="New Research Question">
                <NewResearchQuestionForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Research Question" buttonLabel="New Research Question">
                <NewResearchQuestionForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <ResearchQuestionInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
          <MobileInfoView header="Details" saving={saving}>
            <ResearchQuestionInfo selectedItem={selectedItem} setSaving={setSaving} />
          </MobileInfoView>
        </>
      )}
    </Container>
  );
}
