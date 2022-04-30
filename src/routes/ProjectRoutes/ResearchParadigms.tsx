import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/research_paradigms.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewResearchParadigmForm from '../../components/Projects/ResearchParadigms/AddResearchParadigmForm/NewResearchParadigmForm';
import { useResearchParadigmsStore } from '../../stores/researchParadigmsStore';
import ResearchParadigmInfo from '../../components/Projects/ResearchParadigms/ResearchParadigmInfo/ResearchParadigmInfo';

const options = {
  keys: ['title'],
};

export default function ResearchParadigms({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const research_paradigms = useResearchParadigmsStore((state: any) => state.research_paradigms);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteResearchParadigm = useResearchParadigmsStore(
    (state: any) => state.deleteResearchParadigm,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (research_paradigms.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const researchParadigmId = searchParams.get('researchParadigmId');
        if (research_paradigms && researchParadigmId) {
          const filteredResearchParadigm = research_paradigms.filter(
            (research_paradigm: any) => research_paradigm.id == researchParadigmId,
          );
          setSelectedItem(filteredResearchParadigm[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject, research_paradigms]);

  const handleDeletion = () => {
    setSelectedItem(research_paradigms[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={research_paradigms}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Research Paradigms"
            searchQueryTitle="researchParadigmId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Research Paradigm">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteResearchParadigm}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Research Paradigm"
                buttonLabel="New Research Paradigm">
                <NewResearchParadigmForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Research Paradigm" buttonLabel="New Research Paradigm">
                <NewResearchParadigmForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Details" saving={saving}>
            <ResearchParadigmInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
