import React, { useEffect, useState } from 'react';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useParams, useNavigate } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import LiteratureInfo from '@app/components/Projects/Literature/LiteratureInfo/LiteratureInfo';
import { Container } from './RouteStyles/literature.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewLiteratureForm from '../../components/Projects/Literature/AddLiteratureForm/NewLiteratureForm';
import MobileInfoView from '@app/components/Projects/MobileInfoView/MobileInfoView';
import { Steps } from 'intro.js-react';
import { useGeneralStore } from '@app/stores/generalStore';
import { useProjectStore } from '@app/stores/projectStore';
import Layout from '@app/layouts/Layout';
import ProjectNavBar from '@app/components/Navigation/ProjectNavBar/ProjectNavBar';
import MobileBottomNavBar from '@app/components/Navigation/MobileBottomNavBar/MobileBottomNavBar';

const steps = [
  {
    element: '.newLiteratureButton',
    intro: 'You can add or delete literature with this button.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureList',
    intro:
      'As you build up your list of literature per project, they will show up here in a searchable list.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureNoteEditor',
    intro: `This is your note editor, use this create notes or tasks for each item within a project section.`,
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureFeedView',
    intro: `As you add notes and tasks, they will show up here in the feed.`,
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureTaskView',
    intro: 'You can add and manage tasks for this piece of literature here.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literaturePeopleView',
    intro:
      'You can add new connected people or authors to this piece of literature here. You can manage these people from the people section under the writing tab.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureJournalsView',
    intro:
      'You can add new connected journals to this piece of literature here. You can manage these journals from the journal section under the writing tab.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureKeyTermsView',
    intro:
      'You can add new connected key terms to this piece of literature here. You can manage these key terms from the key terms section under the writing tab.',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.literatureDetails',
    intro:
      'For each piece of literature, you have the ability to fill in all of the critical details you could need.',
    position: 'left',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
];

const options = {
  keys: ['title'],
};

export default function Literature() {
  const [saving, setSaving] = useState(false);
  const [selectedLiterature, setSelectedLiterature] = useState('');
  const [loading, setLoading] = useState(true);
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);
  const [projectLiterature, setProjectLiterature] = useState([]);
  const projects = useProjectStore((state: any) => state.projects);
  const navigate = useNavigate();

  const { literature, deleteLiterature } = useLiteratureStore((state) => ({
    literature: state.literature,
    deleteLiterature: state.deleteLiterature,
  }));

  const { projectId, id } = useParams();

  const onExit = () => {
    setOnboarding(false);
  };

  useEffect(() => {
    const filteredLiterature = literature.filter((literature) => literature.id == id);
    setSelectedLiterature(filteredLiterature[0]);
  }, [id]);

  useEffect(() => {
    const filteredProjectLiterature = literature.filter(
      (literature) => literature.project_id == projectId,
    );
    setProjectLiterature(filteredProjectLiterature);
    setLoading(false);
  }, [projectId]);

  const handleDeletion = () => {
    deleteLiterature(projectId);
    const otherProjects = projects.filter((project: any) => project.id !== projectId);
    navigate(`/projects/${otherProjects[0].id}/overview`);
  };

  return (
    <Layout>
      <Container>
        <ProjectNavBar />
        <MobileBottomNavBar />
        <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
        {!loading && (
          <>
            <InfoNavBar
              items={projectLiterature}
              selectedProject={projectId}
              options={options}
              header="Literature"
              searchQueryTitle="literatureId"
            />
            <Feed selectedItem={selectedLiterature} header="Pick Literature">
              {selectedLiterature && (
                <SplitAddButton
                  selectedItem={selectedLiterature}
                  deleteFunction={() => handleDeletion()}
                  // @ts-ignore
                  confirmMessage={`Are you sure you want to delete ${selectedLiterature.title}?`}
                  confirmHeader="Delete Literature"
                  buttonLabel="New Literature">
                  <NewLiteratureForm />
                </SplitAddButton>
              )}
              {!selectedLiterature && (
                <AddButton header="+ New Literature" buttonLabel="New Literature">
                  <NewLiteratureForm />
                </AddButton>
              )}
            </Feed>
            <InfoView header="Details" saving={saving}>
              <LiteratureInfo selectedLiterature={selectedLiterature} setSaving={setSaving} />
            </InfoView>
            <MobileInfoView header="Details" saving={saving}>
              <LiteratureInfo selectedLiterature={selectedLiterature} setSaving={setSaving} />
            </MobileInfoView>
          </>
        )}
      </Container>
    </Layout>
  );
}
