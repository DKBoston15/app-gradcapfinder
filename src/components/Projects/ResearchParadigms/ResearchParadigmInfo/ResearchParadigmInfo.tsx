import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer, FlexGapContainer } from './styles';
import { useResearchParadigmsStore } from '../../../../stores/researchParadigmsStore';
import { Dropdown as DP, Dropdown } from 'primereact/dropdown';
import './styles.css';
import { useParams } from 'react-router-dom';
import { researchParadigmOptions } from '@app/constants';
import { useProjectStore } from '@app/stores/projectStore';

export default function ResearchParadigmInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const { research_paradigms, patchResearchParadigm } = useResearchParadigmsStore((state) => ({
    research_paradigms: state.research_paradigms,
    patchResearchParadigm: state.patchResearchParadigm,
  }));
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };
  const { id } = useParams();
  useEffect(() => {
    const newSelectedItem = research_paradigms.filter(
      (research_paradigm) => research_paradigm.id == selectedItem,
    );
    if (newSelectedItem.length > 0) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setCategory(newSelectedItem[0].category);
      setSelectedProject(newSelectedItem[0].project_id);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchResearchParadigm(id, title, link, category, selectedProject);
  }, 1500);

  return (
    <>
      {selectedItem && !loading && (
        <div>
          <div>
            <FlexGapContainer>
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
              <CustomInput className="p-float-label">
                <DP
                  id="category"
                  options={researchParadigmOptions}
                  value={category}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setCategory(e.value);
                    debouncedUpdate();
                  }}
                />
                <label htmlFor="category">Category</label>
              </CustomInput>
            </FlexGapContainer>

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
