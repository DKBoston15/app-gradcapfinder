import React, { useState, useEffect } from "react";
import {
  Container,
  ArticleList,
  ArticleItem,
  Title,
  CustomSearch,
  CustomSearchContainer,
} from "./styles";
import Fuse from "fuse.js";
import { useArticleStore } from "@app/stores/articleStore";
import { useNavigate } from "react-router-dom";
import { Article } from "@app/types/index";

export default function ArticleNavBar() {
  const navigate = useNavigate();
  const articles = useArticleStore((state: any) => state.articles);
  const [value1, setValue1] = useState("");
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([]);

  const options = {
    keys: ["title"],
  };

  useEffect(() => {
    setSearchedArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (value1 != "") {
      const fuse = new Fuse(articles, options);
      type FuseResult<Article> = Fuse.FuseResult<Article>;

      let data: FuseResult<Article>[] = fuse.search(value1);
      let modifiedSearchedArray: Article[] = [];
      for (let article = 0; article < data.length; article++) {
        modifiedSearchedArray.push(data[article].item);
      }
      setSearchedArticles(modifiedSearchedArray);
    } else {
      setSearchedArticles(articles);
    }
  }, [value1]);

  return (
    <Container>
      <Title>Articles</Title>
      <CustomSearchContainer className="p-input-icon-left">
        <i className="pi pi-search" />
        <CustomSearch
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          placeholder="Search"
        />
      </CustomSearchContainer>
      <ArticleList>
        {searchedArticles.map((article) => (
          <ArticleItem
            onClick={() => navigate(`/projects/articles/${article.id}`)}
            key={article.id}
          >
            {article.title}
          </ArticleItem>
        ))}
      </ArticleList>
    </Container>
  );
}
