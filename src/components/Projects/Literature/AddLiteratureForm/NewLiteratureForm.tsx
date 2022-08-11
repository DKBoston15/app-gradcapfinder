import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
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
import { Tooltip } from 'primereact/tooltip';
import { useLiteratureStore } from '@app/stores/literatureStore';
import {
  analyticDesignOptions,
  literatureTypes,
  nonProbabilitySampleTechniques,
  probabilitySampleTechniques,
  researchDesignOptions,
  researchParadigmOptions,
  sampleDesignOptions,
} from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';
import { TreeSelect } from 'primereact/treeselect';

const Child = forwardRef((props, ref) => {
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
  const [literatureType, setLiteratureType] = useState('');
  const [link, setLink] = useState(null);
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };
  const addLiterature = useLiteratureStore((state: any) => state.addLiterature);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addLiterature(
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
        literatureType,
      );
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          style={{ width: '100%' }}
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FlexContainer>
        <TreeSelect
          style={{ width: '100%', marginTop: '1.4rem' }}
          value={literatureType}
          options={literatureTypes}
          onChange={(e) => {
            setLiteratureType(e.value);
          }}
          placeholder="Select Type"></TreeSelect>
      </FlexContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomDropdown
            options={researchParadigmOptions}
            style={{ width: '100%' }}
            value={researchParadigm}
            onChange={(e) => setResearchParadigm(e.value)}
            id="researchParadigm"
          />
          <label htmlFor="researchParadigm">Research Paradigm</label>
        </FloatingLabelContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomDropdown
            options={sampleDesignOptions}
            style={{ width: '100%' }}
            value={samplingDesign}
            onChange={(e) => setSamplingDesign(e.value)}
            id="sampleDesign"
          />
          <label htmlFor="sampleDesign">Sample Design</label>
        </FloatingLabelContainer>
      </FlexContainer>
      <FlexContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomMultiSelect
            options={analyticDesignOptions}
            style={{ width: '100%' }}
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
            options={researchDesignOptions}
            style={{ width: '100%' }}
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
              options={probabilitySampleTechniques}
              style={{ width: '100%' }}
              value={samplingTechnique}
              onChange={(e) => setSamplingTechnique(e.value)}
              id="sampleTechnique"
            />
            <label htmlFor="sampleTechnique">Sample Technique</label>
          </FloatingLabelContainer>
        )}
        {samplingDesign === 'Non-Probability' && (
          <FloatingLabelContainer className="p-float-label">
            <CustomDropdown
              options={nonProbabilitySampleTechniques}
              style={{ width: '100%' }}
              value={samplingTechnique}
              onChange={(e) => setSamplingTechnique(e.value)}
              id="sampleTechnique"
            />
            <label htmlFor="sampleTechnique">Sample Technique</label>
          </FloatingLabelContainer>
        )}
      </FlexContainer>
      <ChipContainer>
        <FloatingLabelContainer className="p-float-label">
          <CustomChips
            id="authors"
            style={{ width: '100%' }}
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
          id="journal"
          style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
          style={{ width: '100%' }}
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer>
        <Dropdown
          style={{ width: '100%' }}
          value={selectedProject}
          options={projects}
          onChange={(e) => {
            let newProject = e.value;
            if (e.value === 0) newProject = true;
            if (newProject) {
              setSelectedProject(e.value);
            } else {
              setSelectedProject();
            }
          }}
          itemTemplate={projectItemTemplate}
          placeholder="Select a Project"
          id="projectDropdown"
          optionLabel="name"
          optionValue="id"
          showClear
        />
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
