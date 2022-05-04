import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, DateInput, CustomCalendar, ResponseRate } from './styles';
import { useSamplingStore } from '../../../../stores/samplingStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export default function SamplingInfo({ selectedItem, setSaving }: any) {
  const [loading, setLoading] = useState(true);
  const editSampling = useSamplingStore((state: any) => state.editSampling);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [samplingDesign, setSamplingDesign] = useState('');
  const [samplingTechnique, setSamplingTechnique] = useState('');
  const [sampleSize, setSampleSize] = useState(0);
  const [finalSample, setFinalSample] = useState(0);
  const [powerAnalysis, setPowerAnalysis] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setLink(selectedItem.link);
      setSamplingDesign(selectedItem.sampling_design);
      setSamplingTechnique(selectedItem.sampling_technique);
      setSampleSize(selectedItem.sample_size);
      setFinalSample(selectedItem.final_sample);
      setPowerAnalysis(selectedItem.power_analysis);
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
    await editSampling(
      selectedItem.id,
      title,
      link,
      samplingDesign,
      samplingTechnique,
      sampleSize,
      finalSample,
      powerAnalysis,
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
                value={title}
                onChange={(e) => {
                  // @ts-ignore
                  setTitle(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="title">Title</label>
            </CustomInput>
            <LinkInput className="p-float-label">
              <InputText
                id="link"
                value={link}
                style={{ width: '100%' }}
                onChange={(e) => {
                  // @ts-ignore
                  setLink(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="link">Link</label>
            </LinkInput>
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
                  debouncedUpdate();
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
                    { label: 'Systematic', value: 'Systematic' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={samplingTechnique}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSamplingTechnique(e.value);
                    debouncedUpdate();
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
                    debouncedUpdate();
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
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="samplingTechnique">Sampling Technique</label>
              </CustomInput>
            )}
            <CustomInput className="p-float-label">
              <InputNumber
                style={{ width: '100%' }}
                id="sampleSize"
                value={sampleSize}
                onChange={(e) => {
                  // @ts-ignore
                  setSampleSize(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="sampleSize">Sample Size</label>
            </CustomInput>
            <CustomInput className="p-float-label">
              <InputNumber
                style={{ width: '100%' }}
                id="finalSample"
                value={finalSample}
                onChange={(e) => {
                  // @ts-ignore
                  setFinalSample(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="finalSample">Final Sample</label>
            </CustomInput>
            <ResponseRate>
              <p>
                Response Rate:{' '}
                {finalSample / sampleSize ? (finalSample / sampleSize).toFixed(2) : 0}
              </p>
            </ResponseRate>
            <CustomInput className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                id="powerAnalysis"
                value={powerAnalysis}
                onChange={(e) => {
                  // @ts-ignore
                  setPowerAnalysis(e.target.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="powerAnalysis">Power Analysis</label>
            </CustomInput>
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
