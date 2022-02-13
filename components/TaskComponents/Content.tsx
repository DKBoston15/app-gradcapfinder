import React from "react";
import Sidebar from "./Sidebar";
import { Tasks } from "./Tasks";
export default function Content({
  projects,
  onSubmitProject,
  onDeleteProject,
  selectedProject,
  setSelectedProject,
  tasks,
  onSubmitTask,
  onDeleteTask,
  onArchiveTask,
  updateProjectName,
  onEditTask,
  project,
  setProject,
  getProjectName,
  onCompleteTask,
}: any) {
  return (
    <section className="flex h-full">
      <Sidebar
        setSelectedProject={setSelectedProject}
        projects={projects}
        onSubmitProject={onSubmitProject}
        onDeleteProject={onDeleteProject}
        selectedProject={selectedProject}
        project={project}
        setProject={setProject}
      />
      <Tasks
        projects={projects}
        selectedProject={selectedProject}
        onEditTask={onEditTask}
        onSubmitTask={onSubmitTask}
        onDeleteTask={onDeleteTask}
        onArchiveTask={onArchiveTask}
        updateProjectName={updateProjectName}
        project={project}
        setProject={setProject}
        getProjectName={getProjectName}
        onCompleteTask={onCompleteTask}
      />
    </section>
  );
}
