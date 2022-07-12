import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, DateInput, CustomCalendar, LinkContainer } from './styles';
import { useAnalyticDesignsStore } from '../../../../stores/analyticDesignsStore';
import { Dropdown as DP } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';

export default function AnalyticDesignInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [designTechnique, setDesignTechnique] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);

  const { id } = useParams();

  const { analytic_designs, patchAnalyticDesign } = useAnalyticDesignsStore((state) => ({
    analytic_designs: state.analytic_designs,
    patchAnalyticDesign: state.patchAnalyticDesign,
  }));

  useEffect(() => {
    const newSelectedItem = analytic_designs.filter(
      (analytic_design) => analytic_design.id == selectedItem,
    );
    if (newSelectedItem) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setDesignTechnique(newSelectedItem[0].design_technique);
      setDesignOption(newSelectedItem[0].design_option);
      if (newSelectedItem[0].start_date) {
        setStartDate(new Date(newSelectedItem[0].start_date));
      }
      if (newSelectedItem[0].end_date) {
        setEndDate(new Date(newSelectedItem[0].end_date));
      }
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchAnalyticDesign(id, title, link, designTechnique, designOption, startDate, endDate);
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
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
                  debouncedUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <LinkContainer>
              <LinkInput className="p-float-label">
                <InputText
                  style={{ width: '100%' }}
                  id="link"
                  value={link || ''}
                  onChange={(e) => {
                    // @ts-ignore
                    setLink(e.target.value);
                    debouncedUpdate();
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
              <DP
                id="designTechnique"
                options={[
                  { label: 'Experimental', value: 'Experimental' },
                  { label: 'Observational', value: 'Observational' },
                  { label: 'Other', value: 'Other' },
                ]}
                value={designTechnique}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setDesignTechnique(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="designTechnique">Design</label>
            </CustomInput>
            {designTechnique === 'Experimental' && (
              <CustomInput className="p-float-label">
                <DP
                  id="designOption"
                  options={[
                    { label: 'Lab trials', value: 'Lab trials' },
                    { label: 'Field trials', value: 'Field trials' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={designOption}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setDesignOption(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="designOption">Design Option</label>
              </CustomInput>
            )}
            {designTechnique === 'Observational' && (
              <CustomInput className="p-float-label">
                <DP
                  id="designOption"
                  options={[
                    { label: 'Cross-sectional', value: 'Cross-sectional' },
                    { label: 'Case-control', value: 'Case-control' },
                    { label: 'Cohort', value: 'Cohort' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={designOption}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setDesignOption(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="designOption">Design Option</label>
              </CustomInput>
            )}
            {designTechnique === 'Other' && (
              <CustomInput className="p-float-label">
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
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setDesignOption(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="sampleTechnique">Design Option</label>
              </CustomInput>
            )}
            <DateInput className="p-float-label">
              <CustomCalendar
                id="startDate"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.value);
                  debouncedUpdate();
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
                  debouncedUpdate();
                }}
                showIcon
              />
              <label htmlFor="endDate">End Date</label>
            </DateInput>
          </div>
        </div>
      )}
    </>
  );
}
