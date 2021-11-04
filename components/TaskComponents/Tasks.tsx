import React, { useEffect } from "react";
import Checkbox from "./Checkbox";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { AddTask } from "./AddTask";

export const Tasks = ({ active, tasks, selectedProject, projects }: any) => {
  let projectName = "";
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }
  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}`;
  });

  if (tasks) {
    return (
      <div className="p-8" data-testid="tasks">
        <h2 data-testid="project-name" className="mb-8">
          {projectName}
        </h2>

        <ul className="space-y-4">
          {tasks.map((task: any) => (
            // @ts-ignore
            <div key={`${task.id}`}>
              <li className="flex space-x-4 items-center">
                {/* @ts-ignore */}
                <Checkbox id={task.id} taskDesc={task.task} />
                {/* @ts-ignore */}
                <span>{task.task}</span>
              </li>
            </div>
          ))}
        </ul>
        {selectedProject !== "ARCHIVED" && (
          <AddTask selectedProject={selectedProject} projects={projects} />
        )}
      </div>
    );
  }
  return <div></div>;
};
