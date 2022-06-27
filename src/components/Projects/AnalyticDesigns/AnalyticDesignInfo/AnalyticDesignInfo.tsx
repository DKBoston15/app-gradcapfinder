import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, DateInput, CustomCalendar, LinkContainer } from './styles';
import { useAnalyticDesignsStore } from '../../../../stores/analyticDesignsStore';
import { Dropdown as DP } from 'primereact/dropdown';

export default function AnalyticDesignInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const patchAnalyticDesign = useAnalyticDesignsStore((state: any) => state.patchAnalyticDesign);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [designTechnique, setDesignTechnique] = useState('');
  const [designOption, setDesignOption] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setDesignTechnique(selectedItem.design_technique);
      setDesignOption(selectedItem.design_option);
      if (selectedItem.start_date) {
        setStartDate(new Date(selectedItem.start_date));
      }
      if (selectedItem.end_date) {
        setEndDate(new Date(selectedItem.end_date));
      }
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    setSaving(true);
    await patchAnalyticDesign(
      selectedItem.id,
      title,
      link,
      designTechnique,
      designOption,
      startDate,
      endDate,
    );
    setTimeout(() => {
      setSaving(false);
    }, 500);
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
                <label htmlFor="samplingTechnique">Design Option</label>
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
