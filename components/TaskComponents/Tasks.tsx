import React, { useEffect } from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../../hooks";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../../context";
import { AddTask } from "./AddTask";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

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

  return (
    <div className="p-8" data-testid="tasks">
      <h2 data-testid="project-name" className="mb-8">
        {projectName}
      </h2>

      <ul className="space-y-4">
        {tasks.map((task) => (
          // @ts-ignore
          <div key={`${task.id}`}>
            <li className="flex space-x-4 items-center">
              {/* @ts-ignore */}
              <Checkbox id={task.id} taskDesc={task.task} />
              {/* @ts-ignore */}
              <span>{task.task}</span>
            </li>
            <hr className="border-1 border-gray-300" />
          </div>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
