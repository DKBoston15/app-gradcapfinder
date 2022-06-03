import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  FlexContainer,
  CustomDropdown,
  CustomMultiSelect,
  PageInputs,
  ReferenceInputs,
  CustomChips,
  ChipContainer,
  ChipTooltip,
  SecondFloatingLabelContainer,
} from './styles';
import { supabase } from '@app/supabase/index';
import { Tooltip } from 'primereact/tooltip';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useProjectStore } from '@app/stores/projectStore';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
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

  const addLiterature = useLiteratureStore((state: any) => state.addLiterature);
  const selectedProject = useProjectStore((state: any) => state.selectedProject);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addLiterature(
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
        link,
        selectedProject,
      );
    },
  }));

  return (
    <Container>
      <FlexContainer>
        <FirstFloatingLabelContainer className="p-float-label">
          <CustomDropdown
            options={[
              { label: 'Qualitative', value: 'Qualitative' },
              { label: 'Quantitative', value: 'Quantitative' },
              { label: 'Mixed Methods', value: 'Mixed Methods' },
            ]}
            value={researchParadigm}
            onChange={(e) => setResearchParadigm(e.value)}
            id="researchParadigm"
          />
          <label htmlFor="researchParadigm">Research Paradigm</label>
        </FirstFloatingLabelContainer>
        <SecondFloatingLabelContainer className="p-float-label">
          <CustomDropdown
            options={[
              { label: 'Probability', value: 'Probability' },
              { label: 'Non-Probability', value: 'Non-Probability' },
            ]}
            value={samplingDesign}
            onChange={(e) => setSamplingDesign(e.value)}
            id="samplingDesign"
          />
          <label htmlFor="samplingDesign">Sampling Design</label>
        </SecondFloatingLabelContainer>
      </FlexContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomMultiSelect
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
            onChange={(e) => setAnalyticDesign(e.value)}
            id="analyticDesign"
          />
          <label htmlFor="analyticDesign">Analytic Design</label>
        </FloatingLabelContainer>
      </FlexContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomDropdown
            id="researchDesign"
            options={[
              { label: 'Experimental', value: 'Experimental' },
              { label: 'Survey', value: 'Survey' },
              { label: 'Correlational', value: 'Correlational' },
              { label: 'Review', value: 'Review' },
              { label: 'Other', value: 'Other' },
            ]}
            value={researchDesign}
            onChange={(e) => setResearchDesign(e.value)}
          />
          <label htmlFor="researchDesign">Research Design</label>
        </FloatingLabelContainer>
      </FlexContainer>
      <FlexContainer>
        {samplingDesign === 'Probability' && (
          <FloatingLabelContainer className="p-float-label">
            <CustomDropdown
              options={[
                { label: 'Simple Random', value: 'Simple Random' },
                { label: 'Cluster', value: 'Cluster' },
                { label: 'Stratified', value: 'Stratified' },
                { label: 'Other', value: 'Other' },
              ]}
              value={samplingTechnique}
              onChange={(e) => setSamplingTechnique(e.value)}
              id="samplingTechnique"
            />
            <label htmlFor="samplingTechnique">Sampling Technique</label>
          </FloatingLabelContainer>
        )}
        {samplingDesign === 'Non-Probability' && (
          <FloatingLabelContainer className="p-float-label">
            <CustomDropdown
              options={[
                { label: 'Convenience', value: 'Convenience' },
                { label: 'Snowball', value: 'Snowball' },
                { label: 'Purposive', value: 'Purposive' },
                { label: 'Other', value: 'Other' },
              ]}
              value={samplingTechnique}
              onChange={(e) => setSamplingTechnique(e.value)}
              id="samplingTechnique2"
            />
            <label htmlFor="samplingTechnique2">Sampling Technique</label>
          </FloatingLabelContainer>
        )}
      </FlexContainer>
      <ChipContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomChips
            id="authors"
            value={authors}
            // @ts-ignore
            onChange={(e) => setAuthors(e.value)}></CustomChips>
          <label htmlFor="authors">Authors</label>
        </FloatingLabelContainer>
        <Tooltip
          target=".pi-question-circle"
          content={`You can enter multiple authors by pressing enter after entering an author's name`}
          position="left"
          style={{ fontSize: '12px' }}
        />
        <ChipTooltip className="pi pi-question-circle" />
      </ChipContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="journal"
          // @ts-ignore
          value={journal}
          // @ts-ignore
          onChange={(e) => setJournal(e.target.value)}
        />
        <label htmlFor="journal">Journal</label>
      </FloatingLabelContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <ReferenceInputs
            id="year"
            // @ts-ignore
            value={year}
            // @ts-ignore
            onChange={(e) => setYear(e.target.value)}
          />
          <label htmlFor="year">Year</label>
        </FloatingLabelContainer>

        <FloatingLabelContainer className="p-float-label">
          <ReferenceInputs
            id="volume"
            // @ts-ignore
            value={volume}
            // @ts-ignore
            onChange={(e) => setVolume(e.target.value)}
          />
          <label htmlFor="volume">Volume</label>
        </FloatingLabelContainer>
        <FloatingLabelContainer className="p-float-label">
          <ReferenceInputs
            id="issue"
            // @ts-ignore
            value={issue}
            // @ts-ignore
            onChange={(e) => setIssue(e.target.value)}
          />
          <label htmlFor="issue">Issue</label>
        </FloatingLabelContainer>
      </FlexContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <PageInputs
            id="startPage"
            // @ts-ignore
            value={startPage}
            // @ts-ignore
            onChange={(e) => setStartPage(e.target.value)}
          />
          <label htmlFor="startPage">Start Page</label>
        </FloatingLabelContainer>
        <FloatingLabelContainer className="p-float-label">
          <PageInputs
            id="endPage"
            // @ts-ignore
            value={endPage}
            // @ts-ignore
            onChange={(e) => setEndPage(e.target.value)}
          />
          <label htmlFor="endPage">End Page</label>
        </FloatingLabelContainer>
      </FlexContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="link"
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
    </Container>
  );
});

export default Child;
