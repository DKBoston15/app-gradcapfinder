import React, { useEffect, useState } from "react";
import { Dropdown as DP } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { useArticleStore } from "../../store/articleStore";
import { useDebouncedCallback } from "use-debounce";

export default function ArticleInfo({ selectedArticle }: any) {
  const [saving, setSaving] = useState(false);
  const editArticle = useArticleStore((state: any) => state.editArticle);
  const [researchParadigm, setResearchParadigm] = useState();
  const [samplingDesign, setSamplingDesign] = useState();
  const [samplingTechnique, setSamplingTechnique] = useState();
  const [analyticDesign, setAnalyticDesign] = useState();
  const [researchDesign, setResearchDesign] = useState();
  const [authors, setAuthors] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();
  const [journal, setJournal] = useState();
  const [volume, setVolume] = useState();
  const [issue, setIssue] = useState();
  const [startPage, setStartPage] = useState();
  const [endPage, setEndPage] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    if (selectedArticle) {
      setResearchParadigm(selectedArticle.research_paradigm);
      setSamplingDesign(selectedArticle.sampling_design);
      setResearchDesign(selectedArticle.research_design);
      setSamplingTechnique(selectedArticle.sampling_technique);
      setAnalyticDesign(selectedArticle.analytic_design);
      setAuthors(selectedArticle.authors);
      setYear(selectedArticle.year);
      setTitle(selectedArticle.title);
      setJournal(selectedArticle.journal);
      setVolume(selectedArticle.volume);
      setIssue(selectedArticle.issue);
      setStartPage(selectedArticle.start_page);
      setEndPage(selectedArticle.end_page);
      setLink(selectedArticle.link);
    }
  }, [selectedArticle]);

  const debouncedArticleUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await editArticle(
      selectedArticle.id,
      researchParadigm,
      samplingDesign,
      samplingTechnique,
      analyticDesign,
      researchDesign,
      authors,
      year,
      title,
      journal,
      volume,
      issue,
      startPage,
      endPage,
      link
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
  }, 1500);

  return (
    <div className="overflow-auto h-screen">
      <div className="flex items-center space-x-8">
        <span className="text-3xl font-semibold">Article Info</span>
        {saving && <span className="font-sm">Saving...</span>}
      </div>

      {selectedArticle && (
        <div className="mt-8">
          <div className="flex flex-col space-y-8">
            <span className="p-float-label">
              <DP
                id="researchParadigm"
                options={[
                  { label: "Qualitative", value: "Qualitative" },
                  { label: "Quantitative", value: "Quantitative" },
                  { label: "Mixed Methods", value: "Mixed Methods" },
                ]}
                value={researchParadigm}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setResearchParadigm(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="researchParadigm">Research Paradigm</label>
            </span>
            <span className="p-float-label">
              <DP
                id="samplingDesign"
                options={[
                  { label: "Probability", value: "Probability" },
                  { label: "Non-Probability", value: "Non-Probability" },
                ]}
                value={samplingDesign}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setSamplingDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="samplingDesign">Sampling Design</label>
            </span>
            {samplingDesign === "Probability" && (
              <span className="p-float-label">
                <DP
                  id="samplingTechnique"
                  options={[
                    { label: "Simple Random", value: "Simple Random" },
                    { label: "Cluster", value: "Cluster" },
                    { label: "Stratified", value: "Stratified" },
                    { label: "Other", value: "Other" },
                  ]}
                  value={samplingTechnique}
                  style={{ width: "80%" }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </span>
            )}
            {samplingDesign === "Non-Probability" && (
              <span className="p-float-label">
                <DP
                  id="samplingTechnique"
                  options={[
                    { label: "Convenience", value: "Convenience" },
                    { label: "Snowball", value: "Snowball" },
                    { label: "Purposive", value: "Purposive" },
                    { label: "Other", value: "Other" },
                  ]}
                  value={samplingTechnique}
                  style={{ width: "80%" }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </span>
            )}
            <span className="p-float-label">
              <MultiSelect
                id="analyticDesign"
                options={[
                  { label: "Descriptive", value: "Descriptive" },
                  { label: "Associative", value: "Associative" },
                  { label: "Inferential", value: "Inferential" },
                  { label: "Emergent", value: "Emergent" },
                  { label: "Narrative", value: "Narrative" },
                  { label: "Grounded", value: "Grounded" },
                  { label: "Other", value: "Other" },
                ]}
                value={analyticDesign}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setAnalyticDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="analyticDesign">Analytic Design</label>
            </span>
            <span className="p-float-label">
              <DP
                id="researchDesign"
                options={[
                  { label: "Experimental", value: "Experimental" },
                  { label: "Survey", value: "Survey" },
                  { label: "Correlational", value: "Correlational" },
                  { label: "Review", value: "Review" },
                  { label: "Other", value: "Other" },
                ]}
                value={researchDesign}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setResearchDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="researchDesign">Research Design</label>
            </span>
          </div>
          <div className="flex flex-col space-y-8 mt-8 mb-8">
            <span className="p-float-label">
              <Chips
                id="authors"
                value={authors}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setAuthors(e.target.value);
                  debouncedArticleUpdate();
                }}
              ></Chips>
              <label htmlFor="authors">Authors</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="journal"
                value={journal}
                onChange={(e) => {
                  setJournal(e.target.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="journal">Journal</label>
            </span>
            <div className="flex justify-between w-80/100">
              <span className="p-float-label">
                <InputText
                  id="year"
                  value={year}
                  style={{ width: "90%" }}
                  onChange={(e) => {
                    setYear(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="year">Year</label>
              </span>

              <span className="p-float-label">
                <InputText
                  id="volume"
                  value={volume}
                  style={{ width: "90%" }}
                  onChange={(e) => {
                    setVolume(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="volume">Volume</label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="issue"
                  value={issue}
                  style={{ width: "90%" }}
                  onChange={(e) => {
                    setIssue(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="issue">Issue</label>
              </span>
            </div>

            <div className="flex w-80/100">
              <span className="p-float-label">
                <InputText
                  id="startPage"
                  value={startPage}
                  style={{ width: "90%" }}
                  onChange={(e) => {
                    setStartPage(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="startPage">Start Page</label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="endPage"
                  value={endPage}
                  style={{ width: "90%" }}
                  onChange={(e) => {
                    setEndPage(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="endPage">End Page</label>
              </span>
            </div>

            <span className="p-float-label">
              <InputText
                id="link"
                value={link}
                style={{ width: "80%" }}
                onChange={(e) => {
                  setLink(e.target.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="link">Link</label>
            </span>
          </div>
          <span className="text-2xl font-semibold">Reference</span>
          <div className="bg-dashGray w-80/100 rounded-lg p-2 mt-4">
            {authors?.join(", ")}. ({year}). {title}.{" "}
            <span className="italic">{journal}</span>.{" "}
            <span className="italic">{volume}</span>. {startPage}-{endPage}
          </div>
        </div>
      )}
    </div>
  );
}
