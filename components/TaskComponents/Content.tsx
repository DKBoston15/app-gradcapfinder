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
}: any) {
  return (
    <section className="flex h-full">
      <Sidebar
        setSelectedProject={setSelectedProject}
        projects={projects}
        onSubmitProject={onSubmitProject}
        onDeleteProject={onDeleteProject}
        selectedProject={selectedProject}
      />
      <Tasks
        tasks={tasks}
        projects={projects}
        selectedProject={selectedProject}
        onSubmitTask={onSubmitTask}
        onDeleteTask={onDeleteTask}
        onArchiveTask={onArchiveTask}
        updateProjectName={updateProjectName}
      />
    </section>
  );
}
