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
  DateContainer,
  FlexGapContainer,
  SampleDesignInput,
  PowerFlexGapContainer,
} from './styles';
import { useSamplesStore } from '../../../../stores/samplesStore';
import { Dropdown as DP, Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import './styles.css';
import { useParams } from 'react-router-dom';
import {
  designOtherOptions,
  nonProbabilitySampleTechniques,
  probabilitySampleTechniques,
  sampleDesignOptions,
} from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';

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
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

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
      setSelectedProject(newSelectedItem[0].project_id);
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
    const patchedSampleObj = {
      title,
      link,
      samplingDesign,
      samplingTechnique,
      sampleSize,
      finalSample,
      powerAnalysis,
      startDate,
      endDate,
      project_id: selectedProject,
    };
    await patchSample(id, patchedSampleObj);
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
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
            </div>
            <div>
              <SampleDesignInput className="p-float-label">
                <DP
                  id="sampleDesign"
                  options={sampleDesignOptions}
                  value={samplingDesign}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSamplingDesign(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="sampleDesign">Sample Design</label>
              </SampleDesignInput>
              {samplingDesign === 'Probability' && (
                <CustomInput className="p-float-label">
                  <DP
                    id="sampleTechnique"
                    options={probabilitySampleTechniques}
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
                    options={nonProbabilitySampleTechniques}
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
                    options={designOtherOptions}
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
            </div>
            <FlexGapContainer>
              <CustomInput className="p-float-label">
                <InputNumber
                  style={{ width: '100%' }}
                  id="sampleSize"
                  value={sampleSize || 0}
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
                  value={finalSample || 0}
                  onChange={(e) => {
                    // @ts-ignore
                    setFinalSample(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="finalSample">Final Sample</label>
              </CustomInput>
            </FlexGapContainer>
            <PowerFlexGapContainer>
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
              </CustomInput>{' '}
              <ResponseRate>
                <p>
                  Response Rate:{' '}
                  {finalSample / sampleSize ? (finalSample / sampleSize).toFixed(2) : 0}
                </p>
              </ResponseRate>
            </PowerFlexGapContainer>
            <DateContainer>
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
            </DateContainer>
            <div>
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
            </div>
            <CustomInput className="p-float-label">
              <Dropdown
                style={{ width: '100%', marginTop: '0rem' }}
                value={selectedProject}
                options={projects}
                onChange={(e) => {
                  let newProject = e.value;
                  if (e.value === 0) newProject = true;
                  if (newProject) {
                    setSelectedProject(e.value);
                    debouncedUpdate();
                  } else {
                    setSelectedProject();
                    debouncedUpdate();
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
        </div>
      )}
    </>
  );
}
