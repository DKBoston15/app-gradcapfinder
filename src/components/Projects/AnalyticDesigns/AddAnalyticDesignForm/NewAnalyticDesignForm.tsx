import React, { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Container,
  CustomInputText,
  FirstFloatingLabelContainer,
  FloatingLabelContainer,
  CustomCalendar,
  DateInput,
} from './styles';
import { supabase } from '@app/supabase/index';
import { useAnalyticDesignsStore } from '@app/stores/analyticDesignsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';

const Child = forwardRef((props, ref) => {
  const user = supabase.auth.user();
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
    <Container>
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
          options={[
            { label: 'Experimental', value: 'Experimental' },
            { label: 'Observational', value: 'Observational' },
            { label: 'Other', value: 'Other' },
          ]}
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
            options={[
              { label: 'Lab trials', value: 'Lab trials' },
              { label: 'Field trials', value: 'Field trials' },
              { label: 'Other', value: 'Other' },
            ]}
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
            options={[
              { label: 'Cross-sectional', value: 'Cross-sectional' },
              { label: 'Case-control', value: 'Case-control' },
              { label: 'Cohort', value: 'Cohort' },
              { label: 'Other', value: 'Other' },
            ]}
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
            options={[
              { label: 'Simple Random', value: 'Simple Random' },
              { label: 'Cluster', value: 'Cluster' },
              { label: 'Stratified', value: 'Stratified' },
              { label: 'Convenience', value: 'Convenience' },
              { label: 'Snowball', value: 'Snowball' },
              { label: 'Purposive', value: 'Purposive' },
              { label: 'Other', value: 'Other' },
            ]}
            value={designOption}
            style={{ width: '98%' }}
            onChange={(e) => {
              setDesignOption(e.value);
            }}
          />
          <label htmlFor="samplingTechnique">Design Option</label>
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
    </Container>
  );
});

export default Child;
