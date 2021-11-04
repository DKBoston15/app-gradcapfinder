import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Tasks } from "./Tasks";
export default function Content({
  active,
  setActive,
  setSelectedProject,
  projects,
  setProjects,
  tasks,
  triggerRender,
  setTriggerRender,
  setTriggerTaskRender,
  triggerTaskRender,
  selectedProject,
}: any) {
  return (
    <section className="flex h-full">
      <Sidebar
        setActive={setActive}
        setSelectedProject={setSelectedProject}
        projects={projects}
        setProjects={setProjects}
        tasks={tasks}
        setTriggerRender={setTriggerRender}
        triggerRender={triggerRender}
        selectedProject={selectedProject}
      />
      <Tasks
        tasks={tasks}
        active={active}
        setTriggerTaskRender={setTriggerTaskRender}
        triggerTaskRender={triggerTaskRender}
        projects={projects}
        selectedProject={selectedProject}
      />
    </section>
  );
}
