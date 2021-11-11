import React, { useState, useEffect } from "react";
import IndividualProject from "./IndividualProject";

export default function Projects({
  activeValue = null,
  setSelectedProject,
  projects,
  setProjects,
  selectedProject,
  tasks,
  triggerRender,
  setTriggerRender,
}: any) {
  const [active, setActive] = useState(activeValue);

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
        <IndividualProject
          project={project}
          active={active}
          index={index}
          projects={projects}
          setProjects={setProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          tasks={tasks}
          triggerRender={triggerRender}
          setTriggerRender={setTriggerRender}
        />
      </li>
    ))
  );
}
