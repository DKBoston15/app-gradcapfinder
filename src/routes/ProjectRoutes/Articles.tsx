import React, { useEffect, useState } from "react";
import ArticleNavBar from "@app/components/Navigation/ArticleNavBar/ArticleNavBar";
import { useArticleStore } from "@app/stores/articleStore";
import { useParams } from "react-router-dom";
import ArticleFeed from "@app/components/Projects/Articles/ArticleFeed/ArticleFeed";
import ArticleInfo from "@app/components/Projects/Articles/ArticleInfo/ArticleInfo";
import { Container } from "./RouteStyles/articles.styles";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const navigate = useNavigate();
  const getArticles = useArticleStore((state: any) => state.getArticles);
  const articles = useArticleStore((state: any) => state.articles);
  const { articleId } = useParams();
  const [selectedArticle, setSelectedArticle] = useState();

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

  return (
    <Container>
      <ArticleNavBar />
      <ArticleFeed selectedArticle={selectedArticle} />
      <ArticleInfo selectedArticle={selectedArticle} />
    </Container>
  );
}
