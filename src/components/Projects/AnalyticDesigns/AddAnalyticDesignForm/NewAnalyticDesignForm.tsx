import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CustomCalendar,
  DateInput,
} from './styles';
import { useAnalyticDesignsStore } from '@app/stores/analyticDesignsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';
import {
  designExperimentalOptions,
  designObservationalOptions,
  designOtherOptions,
  designTechniqueOptions,
} from '@app/constants';
import { AnalyticDesign } from '@app/stores/types/analyticDesigns.types';
import { useProjectStore } from '@app/stores/projectStore';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [designTechnique, setDesignTechnique] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);
  const addAnalyticDesign = useAnalyticDesignsStore((state: any) => state.addAnalyticDesign);
  const projects = useProjectStore((state: any) => state.projects);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      const newAnalyticDesign = new AnalyticDesign();
      newAnalyticDesign.title = title;
      newAnalyticDesign.link = link;
      newAnalyticDesign.design_technique = designTechnique;
      newAnalyticDesign.design_option = designOption;
      newAnalyticDesign.start_date = startDate;
      newAnalyticDesign.end_date = endDate;
      newAnalyticDesign.project_id = selectedProject;
      await addAnalyticDesign(newAnalyticDesign);
    },
  }));

  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="title"
          // @ts-ignore
          value={title}
          // @ts-ignore
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="title">Title</label>
      </FirstFloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
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
          id="designTechnique"
          options={designTechniqueOptions}
          value={designTechnique}
          style={{ width: '100%' }}
          onChange={(e) => {
            setDesignTechnique(e.value);
          }}
        />
        <label htmlFor="designTechnique">Design</label>
      </FloatingLabelContainer>
      {designTechnique === 'Experimental' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="designOption"
            options={designExperimentalOptions}
            value={designOption}
            style={{ width: '100%' }}
            onChange={(e) => {
              setDesignOption(e.value);
            }}
          />
          <label htmlFor="designOption">Design Option</label>
        </FloatingLabelContainer>
      )}
      {FloatingLabelContainer === 'Observational' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="designOption"
            options={designObservationalOptions}
            value={designOption}
            style={{ width: '100%' }}
            onChange={(e) => {
              setDesignOption(e.value);
            }}
          />
          <label htmlFor="designOption">Design Option</label>
        </FloatingLabelContainer>
      )}
      {designTechnique === 'Other' && (
        <FloatingLabelContainer className="p-float-label">
          <DP
            id="designOption"
            options={designOtherOptions}
            value={designOption}
            style={{ width: '100%' }}
            onChange={(e) => {
              setDesignOption(e.value);
            }}
          />
          <label htmlFor="sampleTechnique">Design Option</label>
        </FloatingLabelContainer>
      )}
      <DateInput className="p-float-label">
        <CustomCalendar
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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

export default Child;
