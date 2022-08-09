import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CustomCalendar,
  DateInput,
} from './styles';
import { useSamplesStore } from '@app/stores/samplesStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import {
  designOtherOptions,
  nonProbabilitySampleTechniques,
  probabilitySampleTechniques,
  sampleDesignOptions,
} from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';

const NewSampleForm = forwardRef((_props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [samplingDesign, setSamplingDesign] = useState('');
  const [samplingTechnique, setSamplingTechnique] = useState('');
  const [sampleSize, setSampleSize] = useState(0);
  const [finalSample, setFinalSample] = useState(0);
  const [powerAnalysis, setPowerAnalysis] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };
  const addSample = useSamplesStore((state: any) => state.addSample);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      const newSampleObj = {
        title,
        link,
        samplingDesign,
        samplingTechnique,
        sampleSize,
        finalSample,
        powerAnalysis,
        startDate,
        endDate,
        selectedProject,
      };
      await addSample(newSampleObj, selectedProject);
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
      <FloatingLabelContainer className="p-float-label">
        <DP
          id="sampleDesign"
          options={sampleDesignOptions}
          value={samplingDesign}
          style={{ width: '100%' }}
          onChange={(e) => {
            setSamplingDesign(e.value);
          }}
        />
        <label htmlFor="sampleDesign">Sample Design</label>
      </FloatingLabelContainer>
      {samplingDesign === 'Probability' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="sampleTechnique"
            options={probabilitySampleTechniques}
            value={samplingTechnique}
            style={{ width: '100%' }}
            onChange={(e) => {
              setSamplingTechnique(e.value);
            }}
          />
          <label htmlFor="sampleTechnique">Sample Technique</label>
        </FloatingLabelContainer>
      )}
      {samplingDesign === 'Non-Probability' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="sampleTechnique"
            options={nonProbabilitySampleTechniques}
            value={samplingTechnique}
            style={{ width: '100%' }}
            onChange={(e) => {
              setSamplingTechnique(e.value);
            }}
          />
          <label htmlFor="sampleTechnique">Sample Technique</label>
        </FloatingLabelContainer>
      )}
      {samplingDesign === 'Other' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="sampleTechnique"
            options={designOtherOptions}
            value={samplingTechnique}
            style={{ width: '100%' }}
            onChange={(e) => {
              setSamplingTechnique(e.value);
            }}
          />
          <label htmlFor="sampleTechnique">Sample Technique</label>
        </FloatingLabelContainer>
      )}
      <FloatingLabelContainer className="p-float-label">
        <InputNumber
          style={{ width: '100%' }}
          id="sampleSize"
          value={sampleSize}
          onChange={(e) => {
            // @ts-ignore
            setSampleSize(e.value);
          }}
        />
        <label htmlFor="sampleSize">Sample Size</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <InputNumber
          style={{ width: '100%' }}
          id="finalSample"
          value={finalSample}
          onChange={(e) => {
            // @ts-ignore
            setFinalSample(e.value);
          }}
        />
        <label htmlFor="finalSample">Final Sample</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="powerAnalysis"
          value={powerAnalysis}
          onChange={(e) => {
            // @ts-ignore
            setPowerAnalysis(e.target.value);
          }}
        />
        <label htmlFor="powerAnalysis">Power Analysis</label>
      </FloatingLabelContainer>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="startDate"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.value);
          }}
          showIcon
        />
        <label htmlFor="icon">Start Date</label>
      </DateInput>
      <DateInput className="p-float-label">
        <CustomCalendar
          id="endDate"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.value);
          }}
          showIcon
        />
        <label htmlFor="endDate">End Date</label>
      </DateInput>
      <FloatingLabelContainer>
        <DP
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

export default NewSampleForm;
