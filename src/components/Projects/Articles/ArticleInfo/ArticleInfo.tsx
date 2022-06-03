import React, { useEffect, useState } from 'react';
import { Dropdown as DP } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { useArticleStore } from '@app/stores/articleStore';
import { useDebouncedCallback } from 'use-debounce';
import { Tooltip } from 'primereact/tooltip';
import {
  CustomInput,
  ReferenceTitle,
  DOICheckbox,
  PageContainer,
  ReferenceDateInfo,
  ReferenceInput,
  ReferenceContainer,
  LinkContainer,
  LinkInput,
  ChipContainer,
  ChipTooltip,
  JournalName,
} from './styles';

export default function ArticleInfo({ selectedArticle, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const [doi, setDoi] = useState(false);
  const editArticle = useArticleStore((state: any) => state.editArticle);
  const [researchParadigm, setResearchParadigm] = useState('');
  const [samplingDesign, setSamplingDesign] = useState('');
  const [samplingTechnique, setSamplingTechnique] = useState('');
  const [analyticDesign, setAnalyticDesign] = useState(['']);
  const [researchDesign, setResearchDesign] = useState('');
  const [authors, setAuthors] = useState(['']);
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [link, setLink] = useState('');

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
      setLoading(false);
    }
    setLoading(false);
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
      link,
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
  }, 1500);

  return (
    <>
      {selectedArticle && !loading && (
        <div>
          <div>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="title"
                value={title || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setTitle(e.target.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <DP
                id="researchParadigm"
                options={[
                  { label: 'Qualitative', value: 'Qualitative' },
                  { label: 'Quantitative', value: 'Quantitative' },
                  { label: 'Mixed Methods', value: 'Mixed Methods' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={researchParadigm}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setResearchParadigm(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="researchParadigm">Research Paradigm</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <DP
                id="researchDesign"
                options={[
                  { label: 'Experimental', value: 'Experimental' },
                  { label: 'Survey', value: 'Survey' },
                  { label: 'Correlational', value: 'Correlational' },
                  { label: 'Review', value: 'Review' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={researchDesign}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setResearchDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="researchDesign">Research Design</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <DP
                id="samplingDesign"
                options={[
                  { label: 'Probability', value: 'Probability' },
                  { label: 'Non-Probability', value: 'Non-Probability' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={samplingDesign}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setSamplingDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="samplingDesign">Sampling Design</label>
            </CustomInput>
            {samplingDesign === 'Probability' && (
              <CustomInput className="p-float-label">
                <DP
                  id="samplingTechnique"
                  options={[
                    { label: 'Simple Random', value: 'Simple Random' },
                    { label: 'Cluster', value: 'Cluster' },
                    { label: 'Stratified', value: 'Stratified' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={samplingTechnique}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </CustomInput>
            )}
            {samplingDesign === 'Non-Probability' && (
              <CustomInput className="p-float-label">
                <DP
                  id="samplingTechnique"
                  options={[
                    { label: 'Convenience', value: 'Convenience' },
                    { label: 'Snowball', value: 'Snowball' },
                    { label: 'Purposive', value: 'Purposive' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={samplingTechnique}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </CustomInput>
            )}
            {samplingDesign === 'Other' && (
              <CustomInput className="p-float-label">
                <DP
                  id="samplingTechnique"
                  options={[
                    { label: 'Simple Random', value: 'Simple Random' },
                    { label: 'Cluster', value: 'Cluster' },
                    { label: 'Stratified', value: 'Stratified' },
                    { label: 'Convenience', value: 'Convenience' },
                    { label: 'Snowball', value: 'Snowball' },
                    { label: 'Purposive', value: 'Purposive' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={samplingTechnique}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </CustomInput>
            )}
            <CustomInput className="p-float-label">
              <MultiSelect
                id="analyticDesign"
                options={[
                  { label: 'Descriptive', value: 'Descriptive' },
                  { label: 'Associative', value: 'Associative' },
                  { label: 'Inferential', value: 'Inferential' },
                  { label: 'Emergent', value: 'Emergent' },
                  { label: 'Narrative', value: 'Narrative' },
                  { label: 'Grounded', value: 'Grounded' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={analyticDesign}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setAnalyticDesign(e.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="analyticDesign">Analytic Design</label>
            </CustomInput>
          </div>
          <div>
            <ChipContainer>
              <CustomInput className="p-float-label">
                <Chips
                  id="authors"
                  value={authors}
                  onChange={(e) => {
                    // @ts-ignore
                    setAuthors(e.target.value);
                    debouncedArticleUpdate();
                  }}></Chips>
                <label htmlFor="authors">Authors</label>
              </CustomInput>
              <Tooltip
                target=".pi-question-circle"
                content={`You can enter multiple authors by pressing enter after entering an author's name`}
                position="left"
                style={{ fontSize: '12px' }}
              />
              <ChipTooltip className="pi pi-question-circle" />
            </ChipContainer>

            <CustomInput className="p-float-label">
              <InputText
                id="journal"
                style={{ width: '100%' }}
                value={journal || ''}
                onChange={(e) => {
                  // @ts-ignore
                  setJournal(e.target.value);
                  debouncedArticleUpdate();
                }}
              />
              <label htmlFor="journal">Journal</label>
            </CustomInput>
            <ReferenceDateInfo>
              <ReferenceInput className="p-float-label">
                <InputText
                  id="year"
                  value={year || ''}
                  style={{ width: '90%' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setYear(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="year" style={{ whiteSpace: 'nowrap' }}>
                  Year
                </label>
              </ReferenceInput>

              <ReferenceInput className="p-float-label">
                <InputText
                  id="volume"
                  value={volume || ''}
                  style={{ width: '90%' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setVolume(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="volume" style={{ whiteSpace: 'nowrap' }}>
                  Volume
                </label>
              </ReferenceInput>
              <ReferenceInput className="p-float-label">
                <InputText
                  id="issue"
                  value={issue || ''}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setIssue(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="issue" style={{ whiteSpace: 'nowrap' }}>
                  Issue
                </label>
              </ReferenceInput>
            </ReferenceDateInfo>

            <PageContainer>
              <ReferenceInput className="p-float-label">
                <InputText
                  id="startPage"
                  value={startPage || ''}
                  style={{ width: '95%' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setStartPage(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="startPage" style={{ whiteSpace: 'nowrap' }}>
                  Start Page
                </label>
              </ReferenceInput>
              <ReferenceInput className="p-float-label">
                <InputText
                  id="endPage"
                  value={endPage || ''}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setEndPage(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="endPage" style={{ whiteSpace: 'nowrap' }}>
                  End Page
                </label>
              </ReferenceInput>
            </PageContainer>

            <LinkContainer>
              <LinkInput className="p-float-label">
                <InputText
                  style={{ width: '100%' }}
                  id="link"
                  value={link || ''}
                  onChange={(e) => {
                    // @ts-ignore
                    setLink(e.target.value);
                    debouncedArticleUpdate();
                  }}
                />
                <label htmlFor="link">Link</label>
              </LinkInput>
              <i
                className="pi pi-external-link"
                onClick={() => window.open(link, '_blank')}
                style={{
                  fontSize: '1.5em',
                  paddingBottom: '0.6em',
                  marginLeft: '1em',
                  cursor: 'pointer',
                }}
              />
            </LinkContainer>
          </div>
          <ReferenceTitle>Reference</ReferenceTitle>
          <ReferenceContainer>
            {authors && (
              <>
                {/* @ts-ignore */}
                {authors.length > 2 && (
                  <>
                    {/* @ts-ignore */}
                    {authors?.slice(0, -1).join('. ')}. {'& '}
                    {/* @ts-ignore */}
                    {authors[authors.length - 1]}
                    {'.'}
                  </>
                )}
                {/* @ts-ignore */}
                {authors.length === 1 && <>{authors[0]}.</>}
                {/* @ts-ignore */}
                {authors.length === 2 && (
                  <>
                    {/* @ts-ignore */}
                    {authors[0]}., {'&'} {authors[1]}.
                  </>
                )}{' '}
              </>
            )}
            ({year}). {title}. <JournalName>{journal},</JournalName>{' '}
            <span className="italic">{volume}</span>
            <span>{issue ? `(${issue})` : ``}</span>, {startPage}-{endPage}. {doi && link}
          </ReferenceContainer>
          <DOICheckbox>
            <input
              checked={doi || false}
              onChange={() => {
                //@ts-ignore
                setDoi(!doi);
              }}
              type="checkbox"
            />
            <span>Include DOI</span>
          </DOICheckbox>
        </div>
      )}
    </>
  );
}
