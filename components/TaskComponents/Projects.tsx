import React, { useState, useEffect } from "react";
import IndividualProject from "./IndividualProject";

export default function Projects({
  activeValue = null,
  setSelectedProject,
  projects,
  onDeleteProject,
  setProject,
  project,
}: any) {
  const [active, setActive] = useState(activeValue);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [personalProject, setPersonalProject] = useState([]);
  const [dissertationProject, setDissertationProject] = useState([]);

  useEffect(() => {
    //@ts-ignore
    setFilteredProjects(
      // @ts-ignore
      projects.filter(
        (project: any) =>
          project.standard_id != 0 &&
          project.standard_id != 1 &&
          project.standard_id != 2
      )
    );
    //@ts-ignore
    setPersonalProject(projects.filter((project) => project.standard_id == 1));
    //@ts-ignore
    setDissertationProject(
      projects.filter((project) => project.standard_id == 2)
    );
  }, [projects]);

  return (
    <>
      {/* @ts-ignore */}
      {personalProject[0] && (
        <li
          // @ts-ignore
          key={personalProject[0].id}
          onClick={() => {
            // @ts-ignore
            setActive(personalProject[0].id);
            // @ts-ignore
            setSelectedProject(personalProject[0].id);
            // @ts-ignore
            setProject(personalProject[0].id);
          }}
        >
          <IndividualProject
            // @ts-ignore
            index={personalProject[0].id}
            onDeleteProject={onDeleteProject}
            project={personalProject[0]}
            setSelectedProject={setSelectedProject}
          />
        </li>
      )}

      {/* @ts-ignore */}
      {dissertationProject[0] && (
        <li
          // @ts-ignore
          key={dissertationProject[0].id}
          onClick={() => {
            // @ts-ignore
            setActive(dissertationProject[0].id);
            // @ts-ignore
            setSelectedProject(dissertationProject[0].id);
            // @ts-ignore
            setProject(dissertationProject[0].id);
          }}
        >
          <IndividualProject
            // @ts-ignore
            index={dissertationProject[0].id}
            onDeleteProject={onDeleteProject}
            project={dissertationProject[0]}
            setSelectedProject={setSelectedProject}
          />
        </li>
      )}

      {filteredProjects &&
        filteredProjects.map((project: any, index: number) => (
          <li
            key={project.id}
            onClick={() => {
              setActive(project.id);
              setSelectedProject(project.id);
              setProject(project.id);
            }}
          >
            <IndividualProject
              index={index}
              onDeleteProject={onDeleteProject}
              project={project}
              setSelectedProject={setSelectedProject}
            />
          </li>
        ))}
    </>
  );
}
