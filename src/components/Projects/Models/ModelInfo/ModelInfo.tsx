import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useModelsStore } from '../../../../stores/modelsStore';
import { Dropdown as DP, Dropdown } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';
import { modelTypes } from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';

export default function ModelInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };
  const { models, patchModel } = useModelsStore((state) => ({
    models: state.models,
    patchModel: state.patchModel,
  }));

  const { id } = useParams();

  useEffect(() => {
    const newSelectedItem = models.filter((model) => model.id == selectedItem);
    if (newSelectedItem) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setType(newSelectedItem[0].type);
      setSelectedProject(newSelectedItem[0].project_id);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchModel(id, title, link, type, selectedProject);
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
                id="type"
                options={modelTypes}
                value={type}
                style={{ width: '100%' }}
                onChange={(e) => {
                  setType(e.value);
                  debouncedUpdate();
                }}
              />
              <label htmlFor="type">Type</label>
            </CustomInput>
          </div>
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
      )}
    </>
  );
}
