import React, { useState } from "react";
import { Dropdown as DP } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Chips } from "primereact/chips";
import { InputText } from "primereact/inputtext";
import { useArticleStore } from "../../store/articleStore";
import { supabaseClient } from "../../lib/client";

export default function AddArticle() {
  const user = supabaseClient.auth.user();
  const [researchParadigm, setResearchParadigm] = useState(null);
  const [samplingDesign, setSamplingDesign] = useState(null);
  const [samplingTechnique, setSamplingTechnique] = useState(null);
  const [analyticDesign, setAnalyticDesign] = useState(null);
  const [researchDesign, setResearchDesign] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [year, setYear] = useState(null);
  const [title, setTitle] = useState(null);
  const [journal, setJournal] = useState(null);
  const [volume, setVolume] = useState(null);
  const [issue, setIssue] = useState(null);
  const [startPage, setStartPage] = useState(null);
  const [endPage, setEndPage] = useState(null);
  const [link, setLink] = useState(null);

  const addArticle = useArticleStore((state: any) => state.addArticle);

  const createArticle = async () => {
    await addArticle(
      user?.id,
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
  };

  return (
    <div className="overflow-auto">
      <span className="text-3xl font-semibold">Add Article</span>
      <div className="mt-8">
        <div className="flex flex-col space-y-8">
          <span className="p-float-label">
            <DP
              options={[
                { label: "Qualitative", value: "Qualitative" },
                { label: "Quantitative", value: "Quantitative" },
                { label: "Mixed Methods", value: "Mixed Methods" },
              ]}
              value={researchParadigm}
              onChange={(e) => setResearchParadigm(e.value)}
              id="researchParadigm"
              style={{ width: "80%" }}
            />
            <label htmlFor="researchParadigm">Research Paradigm</label>
          </span>
          <span className="p-float-label">
            <DP
              options={[
                { label: "Probability", value: "Probability" },
                { label: "Non-Probability", value: "Non-Probability" },
              ]}
              value={samplingDesign}
              onChange={(e) => setSamplingDesign(e.value)}
              id="samplingDesign"
              style={{ width: "80%" }}
            />
            <label htmlFor="samplingDesign">Sampling Design</label>
          </span>
          {samplingDesign === "Probability" && (
            <span className="p-float-label">
              <DP
                options={[
                  { label: "Simple Random", value: "Simple Random" },
                  { label: "Cluster", value: "Cluster" },
                  { label: "Stratified", value: "Stratified" },
                  { label: "Other", value: "Other" },
                ]}
                value={samplingTechnique}
                onChange={(e) => setSamplingTechnique(e.value)}
                id="samplingTechnique"
                style={{ width: "80%" }}
              />
              <label htmlFor="samplingTechnique">Sampling Technique</label>
            </span>
          )}
          {samplingDesign === "Non-Probability" && (
            <span className="p-float-label">
              <DP
                options={[
                  { label: "Convenience", value: "Convenience" },
                  { label: "Snowball", value: "Snowball" },
                  { label: "Purposive", value: "Purposive" },
                  { label: "Other", value: "Other" },
                ]}
                value={samplingTechnique}
                onChange={(e) => setSamplingTechnique(e.value)}
                id="samplingTechnique2"
                style={{ width: "80%" }}
              />
              <label htmlFor="samplingTechnique2">Sampling Technique</label>
            </span>
          )}

          <span className="p-float-label">
            <MultiSelect
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
              onChange={(e) => setAnalyticDesign(e.value)}
              id="analyticDesign"
              style={{ width: "80%" }}
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
              onChange={(e) => setResearchDesign(e.value)}
              style={{ width: "80%" }}
            />
            <label htmlFor="researchDesign">Research Design</label>
          </span>
        </div>

        <div className="flex flex-col space-y-8 mt-8">
          <span className="p-float-label">
            <Chips
              id="authors"
              value={authors}
              style={{ width: "80%" }}
              // @ts-ignore
              onChange={(e) => setAuthors(e.value)}
            ></Chips>
            <label htmlFor="authors">Authors</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="title"
              // @ts-ignore
              value={title}
              // @ts-ignore
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title">Title</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="journal"
              // @ts-ignore
              value={journal}
              // @ts-ignore
              onChange={(e) => setJournal(e.target.value)}
            />
            <label htmlFor="journal">Journal</label>
          </span>
          <div className="flex justify-between w-80/100">
            <span className="p-float-label">
              <InputText
                id="year"
                style={{ width: "90%" }}
                // @ts-ignore
                value={year}
                // @ts-ignore
                onChange={(e) => setYear(e.target.value)}
              />
              <label htmlFor="year">Year</label>
            </span>

            <span className="p-float-label">
              <InputText
                id="volume"
                style={{ width: "90%" }}
                // @ts-ignore
                value={volume}
                // @ts-ignore
                onChange={(e) => setVolume(e.target.value)}
              />
              <label htmlFor="volume">Volume</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="issue"
                style={{ width: "90%" }}
                // @ts-ignore
                value={issue}
                // @ts-ignore
                onChange={(e) => setIssue(e.target.value)}
              />
              <label htmlFor="issue">Issue</label>
            </span>
          </div>
          <div className="flex w-80/100">
            <span className="p-float-label">
              <InputText
                id="startPage"
                style={{ width: "90%" }}
                // @ts-ignore
                value={startPage}
                // @ts-ignore
                onChange={(e) => setStartPage(e.target.value)}
              />
              <label htmlFor="startPage">Start Page</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="endPage"
                style={{ width: "90%" }}
                // @ts-ignore
                value={endPage}
                // @ts-ignore
                onChange={(e) => setEndPage(e.target.value)}
              />
              <label htmlFor="endPage">End Page</label>
            </span>
          </div>
          <span className="p-float-label">
            <InputText
              id="link"
              style={{ width: "80%" }}
              // @ts-ignore
              value={link}
              // @ts-ignore
              onChange={(e) => setLink(e.target.value)}
            />
            <label htmlFor="link">Link</label>
          </span>
        </div>
      </div>
      <button
        className="w-80/100 mt-4 font-bold text-black rounded-lg py-2 px-6 text-md cursor-pointer bg-primary text-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105"
        type="button"
        onClick={() => createArticle()}
      >
        Add Article
      </button>
    </div>
  );
}
