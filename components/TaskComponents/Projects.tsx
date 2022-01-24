import React, { useState, useEffect } from "react";
import IndividualProject from "./IndividualProject";

export default function Projects({
  activeValue = null,
  setSelectedProject,
  projects,
  onDeleteProject,
}: any) {
  const [active, setActive] = useState(activeValue);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    //@ts-ignore
    setFilteredProjects(projects.filter((project) => project.id != 0));
  }, [projects]);

  return (
    filteredProjects &&
    filteredProjects.map((project: any, index: number) => (
      <li
        key={project.id}
        onClick={() => {
          setActive(project.id);
          setSelectedProject(project.id);
        }}
      >
        <IndividualProject
          index={index}
          onDeleteProject={onDeleteProject}
          project={project}
          setSelectedProject={setSelectedProject}
        />
      </li>
    ))
  );
}
