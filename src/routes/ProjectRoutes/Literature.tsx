import React, { useEffect, useState } from 'react';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useSearchParams } from 'react-router-dom';
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

export default function Literature({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const getLiterature = useLiteratureStore((state: any) => state.getLiterature);
  const literature = useLiteratureStore((state: any) => state.literature);
  const [selectedLiterature, setSelectedLiterature] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteLiterature = useLiteratureStore((state: any) => state.deleteLiterature);
  const [loading, setLoading] = useState(true);
  const onboarding = useGeneralStore((state: any) => state.onboarding);
  const setOnboarding = useGeneralStore((state: any) => state.setOnboarding);

  const onExit = () => {
    setOnboarding(false);
  };

  useEffect(() => {
    const getData = async () => {
      await getLiterature(selectedProject);
    };
    getData();
  }, [selectedProject]);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (literature.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const literatureId = searchParams.get('literatureId');
        if (literature && literatureId) {
          const filteredLiterature = literature.filter(
            (literature: any) => literature.id == literatureId,
          );
          setSelectedLiterature(filteredLiterature[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, literature]);

  useEffect(() => {
    setLoading(false);
    setLoading(true);
    setLoading(false);
  }, [literature]);

  const handleDeletion = () => {
    setSelectedLiterature(literature[0]);
  };

  return (
    <Container>
      <Steps enabled={onboarding} steps={steps} initialStep={0} onExit={onExit} />
      {!loading && (
        <>
          <InfoNavBar
            items={literature}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Literature"
            searchQueryTitle="literatureId"
          />
          <Feed selectedItem={selectedLiterature} header="Pick Literature">
            {selectedLiterature && (
              <SplitAddButton
                selectedItem={selectedLiterature}
                deleteFunction={deleteLiterature}
                handleDeletion={handleDeletion}
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
  );
}
