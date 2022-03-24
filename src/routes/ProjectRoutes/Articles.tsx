import React, { useEffect, useState } from "react";
import ArticleNavBar from "@app/components/Navigation/ArticleNavBar/ArticleNavBar";
import { useArticleStore } from "@app/stores/articleStore";
import { useParams } from "react-router-dom";
import ArticleFeed from "@app/components/Projects/Articles/ArticleFeed/ArticleFeed";
import ArticleInfo from "@app/components/Projects/Articles/ArticleInfo/ArticleInfo";
import { Container } from "./RouteStyles/articles.styles";

export default function Articles() {
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
      setSelectedArticle(filteredArticle[0]);
    }
  }, [articles]);

  return (
    <Container>
      <ArticleNavBar />
      <ArticleFeed />
      <ArticleInfo selectedArticle={selectedArticle} />
    </Container>
  );
}
