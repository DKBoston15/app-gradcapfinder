import React, { useEffect, useState } from "react";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  projects,
  setProjectName,
  projectName,
}: any) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  useEffect(() => {
    setFilteredProjects(
      projects.filter((project: any) => project.standard_id != 0)
    );
  }, [projects]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const truncateProjectName = (name: string) => {
    if (name.length > 34) {
      return name.substring(0, 34) + "...";
    } else {
      return name;
    }
  };

  const colorKey = [
    "#eb4d4b",
    "#6ab04c",
    "#95afc0",
    "#686de0",
    "#e056fd",
    "#f9ca24",
    "#130f40",
    "#4834d4",
    "#22a6b3",
    "#ffbe76",
    "#686de0",
    getRandomColor(),
  ];

  useEffect(() => {
    if (
      projectName === "Today" ||
      projectName === "Upcoming" ||
      projectName === "Alltasks"
    ) {
      setProject(0);
      setProjectName("Quick Tasks");
    }
  }, [showProjectOverlay]);

  const setNewProject = (projectId: string, projectName: string) => {
    setProject(projectId);
    setShowProjectOverlay(false);
    setProjectName(projectName);
  };

  return (
    <div className="project-overlay border-2 border-gray rounded-lg absolute bg-white dark:bg-dark mt-2">
      {filteredProjects && showProjectOverlay && (
        <ul className="project-overlay__list">
          <li onClick={() => setNewProject("QUICK TASKS", "Quick Tasks")}>
            <div className="space-x-2 flex items-center hover:bg-hoverGray p-2">
              <div
                className="rounded-full w-2 h-2 space-x-2 flex items-center hover:bg-hoverGray p-2"
                style={{ backgroundColor: "#5297ff" }}
              />
              <span>Quick Tasks</span>
            </div>
          </li>
          {filteredProjects.map((project: any, index: any) => (
            <li
              key={project.id}
              onClick={() => setNewProject(project.id, project.name)}
            >
              <div className="space-x-2 flex items-center hover:bg-hoverGray p-2">
                <div
                  className="rounded-full w-2 h-2 space-x-2 flex items-center hover:bg-hoverGray p-2"
                  style={{ backgroundColor: colorKey[index] }}
                />
                <span>{truncateProjectName(project.name)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
