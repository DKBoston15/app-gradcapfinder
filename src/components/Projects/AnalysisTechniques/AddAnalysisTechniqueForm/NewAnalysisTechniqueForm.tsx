import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { CustomInputText, FirstFloatingLabelContainer, FloatingLabelContainer } from './styles';
import { useAnalysisTechniquesStore } from '@app/stores/analysisTechniquesStore';
import { Dropdown as DP } from 'primereact/dropdown';
import { useParams } from 'react-router-dom';
import { analysisTechniqueOptions } from '@app/constants';
import { AnalysisTechnique } from '@app/stores/types/analysisTechniques.types';
import { useProjectStore } from '@app/stores/projectStore';

const Child = forwardRef((props, ref) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);
  const [technique, setTechnique] = useState('');
  const [method, setMethod] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const addAnalysisTechnique = useAnalysisTechniquesStore(
    (state: any) => state.addAnalysisTechnique,
  );
  const projects = useProjectStore((state: any) => state.projects);

  useImperativeHandle(ref, () => ({
    async childAddItem() {
      const newAnalysisTechnique = new AnalysisTechnique();
      newAnalysisTechnique.title = title;
      newAnalysisTechnique.link = link;
      newAnalysisTechnique.technique = technique;
      newAnalysisTechnique.method = method;
      if (selectedProject) {
        newAnalysisTechnique.project_id = parseInt(selectedProject);
      }

      await addAnalysisTechnique(newAnalysisTechnique);
    },
  }));

  const projectItemTemplate = (option) => {
    return <span>{`${option.name}`}</span>;
  };

  return (
    <div>
      <FirstFloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
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
          style={{ width: '100%' }}
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
          id="technique"
          options={analysisTechniqueOptions}
          value={technique}
          style={{ width: '100%' }}
          onChange={(e) => {
            setTechnique(e.value);
          }}
        />
        <label htmlFor="technique">Technique</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer className="p-float-label">
        <CustomInputText
          style={{ width: '100%' }}
          id="method"
          value={method}
          onChange={(e) => {
            // @ts-ignore
            setMethod(e.target.value);
          }}
        />
        <label htmlFor="method">Method</label>
      </FloatingLabelContainer>
      <FloatingLabelContainer>
        <DP
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
