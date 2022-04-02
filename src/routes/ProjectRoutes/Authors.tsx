import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import { Container } from './RouteStyles/authors.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewAuthorForm from '../../components/Projects/Authors/AddAuthorForm/NewAuthorForm';
import { usePeopleStore } from '../../stores/peopleStore';
import AuthorInfo from '../../components/Projects/Authors/AuthorInfo/AuthorInfo';

const options = {
  keys: ['title'],
};

export default function Authors({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const authors = usePeopleStore((state: any) => state.authors);
  const [selectedItem, setSelectedItem] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteAuthor = usePeopleStore((state: any) => state.deleteAuthor);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (authors.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const authorId = searchParams.get('authorId');
        if (authors && authorId) {
          const filteredAuthor = authors.filter((author: any) => author.id == authorId);
          setSelectedItem(filteredAuthor[0]);
        }
      }
    }
    setLoading(false);
  }, [selectedProject]);

  const handleDeletion = () => {
    setSelectedItem(authors[0]);
  };

  return (
    <Container>
      {!loading && (
        <>
          <InfoNavBar
            items={authors}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Authors"
            searchQueryTitle="authorId"
          />
          <Feed selectedItem={selectedItem} header="Pick an Author">
            {selectedItem && (
              <SplitAddButton
                selectedItem={selectedItem}
                deleteFunction={deleteAuthor}
                handleDeletion={handleDeletion}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedItem.title}?`}
                confirmHeader="Delete Author"
                buttonLabel="New Author">
                <NewAuthorForm />
              </SplitAddButton>
            )}
            {!selectedItem && (
              <AddButton header="+ New Author" buttonLabel="New Author">
                <NewAuthorForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Author Info" saving={saving}>
            <AuthorInfo selectedItem={selectedItem} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
