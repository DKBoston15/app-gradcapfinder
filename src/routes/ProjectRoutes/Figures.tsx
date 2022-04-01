import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/figures.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewFigureForm from '../../components/Projects/Figures/AddFigureForm/NewFigureForm';
import { useFigureStore } from '../../stores/figureStore';
import FigureInfo from '../../components/Projects/Figures/FigureInfo/FigureInfo';

const options = {
  keys: ['title'],
};

export default function Figures({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const figures = useFigureStore((state: any) => state.figures);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteFigure = useFigureStore((state: any) => state.deleteFigure);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (figures.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const figureId = searchParams.get('figureId');
        if (figures && figureId) {
          const filteredFigure = figures.filter((figure: any) => figure.id == figureId);
          setSelectedItem(filteredFigure[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={figures}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Figures"
            searchQueryTitle="figureId"
          />
          <Feed selectedItem={selectedItem} header="Pick a Figure">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteFigure}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Figure"
                buttonLabel="New Figure">
                <NewFigureForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Figure" buttonLabel="New Figure">
                <NewFigureForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Figure Info" saving={saving}>
            <FigureInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
