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

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [designTechnique, setDesignTechnique] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);
  const { projectId } = useParams();
  const addAnalyticDesign = useAnalyticDesignsStore((state: any) => state.addAnalyticDesign);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addAnalyticDesign(
        title,
        link,
        designTechnique,
        designOption,
        startDate,
        endDate,
        projectId,
      );
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
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
          style={{ width: '98%' }}
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
            style={{ width: '98%' }}
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
            style={{ width: '98%' }}
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
            style={{ width: '98%' }}
            onChange={(e) => {
              setDesignOption(e.value);
            }}
          />
          <label htmlFor="sampleTechnique">Design Option</label>
        </FloatingLabelContainer>
      )}
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
    </div>
  );
});

export default Child;
