import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useResearchQuestionsStore } from '@app/stores/researchQuestionsStore';
import { useProjectStore } from '@app/stores/projectStore';
import { Dropdown } from 'primereact/dropdown';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [selectedProject, setSelectedProject] = useState();
  const projects = useProjectStore((state: any) => state.projects);
  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };
  const addResearchQuestion = useResearchQuestionsStore((state: any) => state.addResearchQuestion);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      await addResearchQuestion(title, link, selectedProject);
    },
  }));

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          id="title"
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
          // @ts-ignore
          value={link}
          // @ts-ignore
          onChange={(e) => setLink(e.target.value)}
        />
        <label htmlFor="link">Link</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer>
        <Dropdown
          style={{ width: '100%' }}
          value={selectedProject}
          options={projects}
          onChange={(e) => {
            let newProject = e.value;
            if (e.value === 0) newProject = true;
            if (newProject) {
              setSelectedProject(e.value);
            } else {
              setSelectedProject();
            }
          }}
          itemTemplate={projectItemTemplate}
          placeholder="Select a Project"
          id="projectDropdown"
          optionLabel="name"
          optionValue="id"
          showClear
        />
      </FloatingLabelContainer>
    </div>
  );
});

export default Child;
