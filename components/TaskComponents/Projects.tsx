import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../../context";
import IndividualProject from "./IndividualProject";

export default function Projects({ activeValue = true }) {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  return (
    projects &&
    projects.map((project: any) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
        <IndividualProject project={project} />
      </li>
    ))
  );
}
