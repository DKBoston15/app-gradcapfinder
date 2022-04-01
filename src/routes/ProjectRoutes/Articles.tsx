import { useEffect, useState } from 'react';
import { useArticleStore } from '@app/stores/articleStore';
import { useSearchParams } from 'react-router-dom';
import Feed from '@app/components/Projects/Feed/Feed';
import ArticleInfo from '@app/components/Projects/Articles/ArticleInfo/ArticleInfo';
import { Container } from './RouteStyles/articles.styles';
import InfoView from '@app/components/Projects/InfoView/InfoView';
import InfoNavBar from '../../components/Navigation/InfoNavBar/InfoNavBar';
import SplitAddButton from '../../components/Projects/SplitAddButton/SplitAddButton';
import AddButton from '@app/components/Projects/AddButton/AddButton';
import NewArticleForm from '../../components/Projects/Articles/AddArticleForm/NewArticleForm';

const options = {
  keys: ['title'],
};

export default function Articles({ selectedProject, setSelectedProject, projects }: any) {
  const [saving, setSaving] = useState(false);
  const articles = useArticleStore((state: any) => state.articles);
  const [selectedArticle, setSelectedArticle] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const deleteArticle = useArticleStore((state: any) => state.deleteArticle);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('projectId');

    if (projects && projectId) {
      const project = projects.filter((project: any) => project.id == projectId);
      setSelectedProject(projectId, project[0].name);
    }
    if (articles.length > 0) {
      setLoading(false);
      if (projects.length > 0) {
        const articleId = searchParams.get('articleId');
        if (articles && articleId) {
          const filteredArticle = articles.filter((article: any) => article.id == articleId);
          setSelectedArticle(filteredArticle[0]);
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
            items={articles}
            setSearchParams={setSearchParams}
            selectedProject={selectedProject}
            options={options}
            header="Articles"
            searchQueryTitle="articleId"
          />
          <Feed selectedItem={selectedArticle} header="Pick an Article">
            {selectedArticle && (
              <SplitAddButton
                selectedItem={selectedArticle}
                deleteFunction={deleteArticle}
                // @ts-ignore
                confirmMessage={`Are you sure you want to delete ${selectedArticle.title}?`}
                confirmHeader="Delete Article"
                buttonLabel="New Article">
                <NewArticleForm />
              </SplitAddButton>
            )}
            {!selectedArticle && (
              <AddButton header="+ New Article" buttonLabel="New Article">
                <NewArticleForm />
              </AddButton>
            )}
          </Feed>
          <InfoView header="Article Info" saving={saving}>
            <ArticleInfo selectedArticle={selectedArticle} setSaving={setSaving} />
          </InfoView>
        </>
      )}
    </Container>
  );
}
