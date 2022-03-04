import React, { useEffect } from "react";
import ArticleInfo from "./ArticleInfo";
import AddArticle from "./AddArticle";

export default function ArticleSidebar({
  selectedArticle,
  setResearchParadigm,
  setSamplingDesign,
  setSamplingTechnique,
  setAnalyticDesign,
  setResearchDesign,
  setAuthors,
  setYear,
  setTitle,
  setJournal,
  setVolume,
  setIssue,
  setStartPage,
  setEndPage,
  setAddArticle,
  addArticle,
  setLink,
}: any) {
  useEffect(() => {
    console.log(addArticle);
  }, [addArticle]);

  return (
    <div className="flex flex-col h-screen w-full p-6 ">
      {!addArticle && (
        <ArticleInfo
          selectedArticle={selectedArticle}
          setResearchParadigm={setResearchParadigm}
          setSamplingDesign={setSamplingDesign}
          setSamplingTechnique={setSamplingTechnique}
          setAnalyticDesign={setAnalyticDesign}
          setResearchDesign={setResearchDesign}
          setAuthors={setAuthors}
          setYear={setYear}
          setTitle={setTitle}
          setJournal={setJournal}
          setVolume={setVolume}
          setIssue={setIssue}
          setStartPage={setStartPage}
          setEndPage={setEndPage}
          setLink={setLink}
        />
      )}

      {addArticle && <AddArticle />}
    </div>
  );
}
