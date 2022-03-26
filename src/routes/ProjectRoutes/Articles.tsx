import { useEffect, useState } from "react";
import { useArticleStore } from "@app/stores/articleStore";
import { useParams } from "react-router-dom";
import Feed from "@app/components/Projects/Feed/Feed";
import ArticleInfo from "@app/components/Projects/Articles/ArticleInfo/ArticleInfo";
import { Container } from "./RouteStyles/articles.styles";
import { useNavigate } from "react-router-dom";
import InfoView from "@app/components/Projects/InfoView/InfoView";
import InfoNavBar from "../../components/Navigation/InfoNavBar/InfoNavBar";
import SplitAddButton from "../../components/Projects/SplitAddButton/SplitAddButton";

export default function Articles() {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const articles = useArticleStore((state: any) => state.articles);
  const { articleId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState();

  const options = {
    keys: ["title"],
  };

  const navigateFunction = (id: string) => navigate(`/projects/articles/${id}`);

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (articles) {
      const filteredArticle = articles.filter(
        (article: any) => article.id == articleId
      );
      if (filteredArticle.length > 0) {
        setSelectedArticle(filteredArticle[0]);
      } else if (articles.length > 0) {
        setSelectedArticle(articles[0]);
        navigate(`/projects/articles/${articles[0].id}`);
      }
    }
  }, [articles]);

  const deleteArticle = useArticleStore((state: any) => state.deleteArticle);

  return (
    <Container>
      <InfoNavBar
        items={articles}
        navigateFunction={navigateFunction}
        options={options}
        header="Articles"
      />
      <Feed selectedItem={selectedArticle} header="Add an Article">
        {selectedArticle && (
          <SplitAddButton
            selectedItem={selectedArticle}
            deleteFunction={deleteArticle}
            confirmMessage={`Are you sure you want to delete ${selectedArticle.title}?`}
            confirmHeader="Delete Article"
            buttonLabel="New Article"
          />
        )}
      </Feed>
      <InfoView header="Article Info" saving={saving}>
        <ArticleInfo selectedArticle={selectedArticle} setSaving={setSaving} />
      </InfoView>
    </Container>
  );
}
