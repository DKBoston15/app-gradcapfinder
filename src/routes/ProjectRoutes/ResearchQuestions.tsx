import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/research_questions.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewResearchQuestionForm from '../../components/Projects/ResearchQuestions/AddResearchQuestionForm/NewResearchQuestionForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';
import ResearchQuestionInfo from '@app/components/Projects/ResearchQuestions/ResearchQuestionInfo/ResearchQuestionInfo';

const options = {
  keys: ['title'],
};

export default function ResearchQuestions() {
  const [saving, setSaving] = useState(false);
  const [selectedResearchQuestion, setSelectedResearchQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectResearchQuestions, setProjectResearchQuestions] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { research_questions, deleteResearchQuestion } = useResearchQuestionsStore((state) => ({
    research_questions: state.research_questions,
    deleteResearchQuestion: state.deleteResearchQuestion,
  }));

  const { projectId, id } = useParams();

  useEffect(() => {
    const filteredResearchQuestions = research_questions.filter(
      (research_question) => research_question.id == id,
    );
    setSelectedResearchQuestion(filteredResearchQuestions[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectResearchQuestions = research_questions.filter(
      (research_question) => research_question.project_id == projectId,
    );
    setProjectResearchQuestions(filteredProjectResearchQuestions);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteResearchQuestion(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };
  return (
    <Layout>
      <Container>
        <ProjectNavBar />
        <MobileBottomNavBar />
        {!loading && (
          <>
            <InfoNavBar
              items={projectResearchQuestions}
              selectedProject={projectId}
              options={options}
              header="Research Questions"
              title="research_questions"
            />
            <Feed selectedItem={selectedResearchQuestion} header="Pick a Research Question">
              {selectedResearchQuestion && (
                <SplitAddButton
                  selectedItem={selectedResearchQuestion}
                  deleteFunction={deleteResearchQuestion}
                  handleDeletion={handleDeletion}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedResearchQuestion.title}?`}
                  confirmHeader="Delete Research Question"
                  buttonLabel="New Research Question">
                  <NewResearchQuestionForm />
                </SplitAddButton>
              )}
              {!selectedResearchQuestion && (
                <AddButton header="+ New Research Question" buttonLabel="New Research Question">
                  <NewResearchQuestionForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <ResearchQuestionInfo selectedItem={selectedResearchQuestion} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <ResearchQuestionInfo selectedItem={selectedResearchQuestion} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
