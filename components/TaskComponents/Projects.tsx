import React, { useState } from "react";
import { useSelectedProjectValue, useProjectsValue } from "../../context";
import IndividualProject from "./IndividualProject";

export default function Projects({ activeValue = null }) {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  return (
    projects &&
    projects.map((project: any, index: number) => (
      <li
        key={project.projectId}
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
      >
        <IndividualProject project={project} active={active} index={index} />
      </li>
    ))
  );
}
