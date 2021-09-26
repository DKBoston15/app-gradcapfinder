import React, { useEffect } from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../../hooks";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../../context";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (collatedTasksExist(selectedProject) && selectedProject) {
    /* @ts-ignore */

    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    /* @ts-ignore */
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

  return (
    <div className="p-8" data-testid="tasks">
      <h2 data-testid="project-name" className="mb-8">
        {projectName}
      </h2>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <>
            {/* @ts-ignore */}
            <li key={`${task.id}`} className="flex space-x-4 items-center">
              {/* @ts-ignore */}
              <Checkbox id={task.id} taskDesc={task.task} />
              {/* @ts-ignore */}
              <span>{task.task}</span>
            </li>
            <hr className="border-1 border-gray-300" />
          </>
        ))}
      </ul>
    </div>
  );
};
