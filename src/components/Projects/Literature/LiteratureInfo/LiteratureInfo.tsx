import React, { useEffect, useState } from 'react';
import { Dropdown as DP, Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { useLiteratureStore } from '@app/stores/literatureStore';
import { useDebouncedCallback } from 'use-debounce';
import { Tooltip } from 'primereact/tooltip';
import {
  CustomInput,
  ReferenceInput,
  LinkContainer,
  LinkInput,
  ChipContainer,
  ChipTooltip,
  FirstCustomInput,
  FieldContainer,
} from './styles';
import { useParams } from 'react-router-dom';
import './styles.css';
import {
  analyticDesignOptions,
  designOtherOptions,
  nonProbabilitySampleTechniques,
  probabilitySampleTechniques,
  researchDesignOptions,
  researchParadigmOptions,
  sampleDesignOptions,
} from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';

export default function LiteratureInfo({ selectedLiterature }: any) {
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
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  const { id } = useParams();

  const { literature, patchLiterature } = useLiteratureStore((state) => ({
    literature: state.literature,
    patchLiterature: state.patchLiterature,
  }));

  const [options, setOptions] = useState([
    { label: 'Simple Random', value: 'Simple Random' },
    { label: 'Cluster', value: 'Cluster' },
    { label: 'Stratified', value: 'Stratified' },
    { label: 'Convenience', value: 'Convenience' },
    { label: 'Snowball', value: 'Snowball' },
    { label: 'Purposive', value: 'Purposive' },
    { label: 'Other', value: 'Other' },
  ]);

  useEffect(() => {
    const selectedItem = literature.filter((lit) => lit.id == selectedLiterature);
    if (selectedItem.length > 0) {
      setResearchParadigm(selectedItem[0].research_paradigm);
      setSamplingDesign(selectedItem[0].sampling_design);
      setResearchDesign(selectedItem[0].research_design);
      setSamplingTechnique(selectedItem[0].sampling_technique);
      setAnalyticDesign(selectedItem[0].analytic_design);
      setAuthors(selectedItem[0].authors);
      setYear(selectedItem[0].year);
      setTitle(selectedItem[0].title);
      setJournal(selectedItem[0].journal);
      setVolume(selectedItem[0].volume);
      setIssue(selectedItem[0].issue);
      setStartPage(selectedItem[0].start_page);
      setEndPage(selectedItem[0].end_page);
      setLink(selectedItem[0].link);
      setSelectedProject(selectedItem[0].project_id);
    }
  }, [selectedLiterature]);

  useEffect(() => {
    if (samplingDesign === 'Probability') {
      setOptions([...probabilitySampleTechniques]);
    }

    if (samplingDesign === 'Non-Probability') {
      setOptions([...nonProbabilitySampleTechniques]);
    }

    if (samplingDesign === 'Other') {
      setOptions([...designOtherOptions]);
    }
  }, [samplingDesign]);

  const debouncedLiteratureUpdate = useDebouncedCallback(async () => {
    await patchLiterature(
      id,
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
  }, 1500);

  return (
    <div className="literatureDetails">
      <FirstCustomInput className="p-float-label">
        <InputText
          id="title"
          value={title || ''}
          onChange={(e) => {
            // @ts-ignore
            setTitle(e.target.value);
            debouncedLiteratureUpdate();
          }}
        />
        <label htmlFor="title">Title</label>
      </FirstCustomInput>
      <FieldContainer>
        <CustomInput className="p-float-label">
          <DP
            id="researchParadigm"
            options={researchParadigmOptions}
            value={researchParadigm}
            onChange={(e) => {
              setResearchParadigm(e.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="researchParadigm">Research Paradigm</label>
        </CustomInput>
        <CustomInput className="p-float-label">
          <DP
            id="researchDesign"
            options={researchDesignOptions}
            value={researchDesign}
            onChange={(e) => {
              setResearchDesign(e.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="researchDesign">Research Design</label>
        </CustomInput>
      </FieldContainer>
      <FieldContainer>
        <CustomInput className="p-float-label">
          <DP
            id="sampleDesign"
            options={sampleDesignOptions}
            value={samplingDesign}
            onChange={(e) => {
              setSamplingDesign(e.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="sampleDesign">Sample Design</label>
        </CustomInput>
        <CustomInput className="p-float-label">
          <DP
            id="sampleTechnique"
            options={options}
            value={samplingTechnique}
            onChange={(e) => {
              setSamplingTechnique(e.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="sampleTechnique">Sample Technique</label>
        </CustomInput>
      </FieldContainer>

      <CustomInput className="p-float-label">
        <MultiSelect
          id="analyticDesign"
          options={analyticDesignOptions}
          value={analyticDesign}
          onChange={(e) => {
            setAnalyticDesign(e.value);
            debouncedLiteratureUpdate();
          }}
        />
        <label htmlFor="analyticDesign">Analytic Design</label>
      </CustomInput>
      <ChipContainer>
        <CustomInput className="p-float-label">
          <Chips
            id="authors"
            value={authors}
            onChange={(e) => {
              // @ts-ignore
              setAuthors(e.target.value);
              debouncedLiteratureUpdate();
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
      <FieldContainer>
        <CustomInput className="p-float-label">
          <InputText
            id="journal"
            value={journal || ''}
            onChange={(e) => {
              // @ts-ignore
              setJournal(e.target.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="journal">Journal</label>
        </CustomInput>
        <CustomInput className="p-float-label">
          <InputText
            id="year"
            value={year || ''}
            onChange={(e) => {
              // @ts-ignore
              setYear(e.target.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="year" style={{ whiteSpace: 'nowrap' }}>
            Year
          </label>
        </CustomInput>
      </FieldContainer>
      <FieldContainer>
        <ReferenceInput className="p-float-label">
          <InputText
            id="volume"
            value={volume || ''}
            onChange={(e) => {
              // @ts-ignore
              setVolume(e.target.value);
              debouncedLiteratureUpdate();
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
            onChange={(e) => {
              // @ts-ignore
              setIssue(e.target.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="issue" style={{ whiteSpace: 'nowrap' }}>
            Issue
          </label>
        </ReferenceInput>
      </FieldContainer>
      <FieldContainer>
        <ReferenceInput className="p-float-label">
          <InputText
            id="startPage"
            value={startPage || ''}
            onChange={(e) => {
              // @ts-ignore
              setStartPage(e.target.value);
              debouncedLiteratureUpdate();
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
            onChange={(e) => {
              // @ts-ignore
              setEndPage(e.target.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="endPage" style={{ whiteSpace: 'nowrap' }}>
            End Page
          </label>
        </ReferenceInput>
      </FieldContainer>
      <LinkContainer>
        <LinkInput className="p-float-label">
          <InputText
            id="link"
            value={link || ''}
            onChange={(e) => {
              // @ts-ignore
              setLink(e.target.value);
              debouncedLiteratureUpdate();
            }}
          />
          <label htmlFor="link">Link</label>
        </LinkInput>
        <i
          className="pi pi-external-link"
          onClick={() => window.open(link, '_blank')}
          style={{
            fontSize: '1.5em',
            paddingBottom: '0.2em',
            marginLeft: '1em',
            cursor: 'pointer',
          }}
        />
      </LinkContainer>
      <CustomInput className="p-float-label">
        <Dropdown
          style={{ width: '100%', marginTop: '1rem' }}
          value={selectedProject}
          options={projects}
          onChange={(e) => {
            let newProject = e.value;
            if (e.value === 0) newProject = true;
            if (newProject) {
              setSelectedProject(e.value);
              debouncedLiteratureUpdate();
            } else {
              setSelectedProject();
              debouncedLiteratureUpdate();
            }
          }}
          itemTemplate={projectItemTemplate}
          placeholder="Select a Project"
          id="projectDropdown"
          optionLabel="name"
          optionValue="id"
          showClear
        />
      </CustomInput>
    </div>
  );
}
