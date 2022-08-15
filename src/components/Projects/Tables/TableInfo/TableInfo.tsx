import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDebouncedCallback } from 'use-debounce';
import { CustomInput, LinkInput, LinkContainer } from './styles';
import { useTablesStore } from '../../../../stores/tablesStore';
import './styles.css';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';

export default function TableInfo({ selectedItem }: any) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const { id } = useParams();
  const { tables, patchTable } = useTablesStore((state) => ({
    tables: state.tables,
    patchTable: state.patchTable,
  }));
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  useEffect(() => {
    const newSelectedItem = tables.filter((table) => table.id == selectedItem);
    if (newSelectedItem.length > 0) {
      setTitle(newSelectedItem[0].title);
      setLink(newSelectedItem[0].link);
      setSelectedProject(newSelectedItem[0].project_id);
      setLoading(false);
    }
    setLoading(false);
  }, [selectedItem]);

  const debouncedUpdate = useDebouncedCallback(async () => {
    await patchTable(id, title, link, selectedProject);
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
        </div>
      )}
    </>
  );
}
