import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  ArticleList,
  ArticleItem,
  Title,
  CustomSearch,
  CustomSearchContainer,
  ButtonContainer,
  CustomButton,
} from "./styles";
import Fuse from "fuse.js";
import { useArticleStore } from "@app/stores/articleStore";
import { useNavigate } from "react-router-dom";
import { Article } from "@app/types/index";
// import { SlideMenu } from "primereact/slidemenu";

export default function ArticleNavBar() {
  const navigate = useNavigate();
  const articles = useArticleStore((state: any) => state.articles);
  const [value1, setValue1] = useState("");
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([]);
  const menu = useRef(null);
  // const items = [
  //   {
  //     label: "Research Paradigm",
  //     items: [
  //       {
  //         label: "Qualitative",
  //       },
  //       {
  //         label: "Quantitative",
  //       },
  //       {
  //         label: "Mixed Methods",
  //       },
  //       {
  //         label: "Other",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Research Design",
  //     items: [
  //       {
  //         label: "Experimental",
  //       },
  //       {
  //         label: "Survey",
  //       },
  //       {
  //         label: "Correlational",
  //       },
  //       {
  //         label: "Review",
  //       },
  //       {
  //         label: "Other",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Sampling Design",
  //     items: [
  //       {
  //         label: "Probability",
  //       },
  //       {
  //         label: "Non-Probability",
  //       },
  //       {
  //         label: "Other",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Sampling Technique",
  //     items: [
  //       {
  //         label: "Simple Random",
  //       },
  //       {
  //         label: "Cluster",
  //       },
  //       {
  //         label: "Stratified",
  //       },
  //       {
  //         label: "Other",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Analytic Design",
  //     items: [
  //       {
  //         label: "Descriptive",
  //       },
  //       {
  //         label: "Associative",
  //       },
  //       {
  //         label: "Inferential",
  //       },
  //       {
  //         label: "Emergent",
  //       },
  //       {
  //         label: "Narrative",
  //       },
  //       {
  //         label: "Grounded",
  //       },
  //       {
  //         label: "Other",
  //       },
  //     ],
  //   },
  // ];

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
      {/* <SlideMenu ref={menu} model={items} popup /> */}
      <ButtonContainer>
        <CustomSearchContainer className="p-input-icon-left">
          <i className="pi pi-search" />
          <CustomSearch
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Search"
          />
        </CustomSearchContainer>
        {/* <CustomButton
          type="button"
          className="p-btn-sm"
          icon="pi pi-filter"
          // @ts-ignore
          onClick={(event) => menu.current.toggle(event)}
        /> */}
      </ButtonContainer>

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
