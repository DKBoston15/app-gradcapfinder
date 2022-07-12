import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import {
  CustomInput,
  LinkInput,
  DateInput,
  CustomCalendar,
  ResponseRate,
  LinkContainer,
} from './styles';
import { useSamplesStore } from '../../../../stores/samplesStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import './styles.css';
import { useParams } from 'react-router-dom';

export default function SampleInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [samplingDesign, setSamplingDesign] = useState('');
  const [samplingTechnique, setSamplingTechnique] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [finalSample, setFinalSample] = useState('');
  const [powerAnalysis, setPowerAnalysis] = useState('');
  const [startDate, setStartDate] = useState<Date | Date[] | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | Date[] | undefined>(undefined);

  const { samples, patchSample } = useSamplesStore((state) => ({
    samples: state.samples,
    patchSample: state.patchSample,
  }));
  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = samples.filter((sample) => sample.id == selectedItem);
    if (newSelectedItem) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setSamplingDesign(newSelectedItem[0].sampling_design);
      setSamplingTechnique(newSelectedItem[0].sampling_technique);
      setSampleSize(newSelectedItem[0].sample_size);
      setFinalSample(newSelectedItem[0].final_sample);
      setPowerAnalysis(newSelectedItem[0].power_analysis);
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
    await patchSample(
      id,
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
                id="sampleDesign"
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
              <label htmlFor="sampleDesign">Sample Design</label>
            </CustomInput>
            {samplingDesign === 'Probability' && (
              <CustomInput className="p-float-label">
                <DP
                  id="sampleTechnique"
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
                <label htmlFor="sampleTechnique">Sample Technique</label>
              </CustomInput>
            )}
            {samplingDesign === 'Non-Probability' && (
              <CustomInput className="p-float-label">
                <DP
                  id="sampleTechnique"
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
                <label htmlFor="sampleTechnique">Sample Technique</label>
              </CustomInput>
            )}
            {samplingDesign === 'Other' && (
              <CustomInput className="p-float-label">
                <DP
                  id="sampleTechnique"
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
                <label htmlFor="sampleTechnique">Sample Technique</label>
              </CustomInput>
            )}
            <CustomInput className="p-float-label">
              <InputNumber
                style={{ width: '100%' }}
                id="sampleSize"
                value={sampleSize || ''}
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
                value={finalSample || ''}
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
                value={powerAnalysis || ''}
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
