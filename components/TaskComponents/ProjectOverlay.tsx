import React from "react";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  projects,
}: any) => {
  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project: any) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
