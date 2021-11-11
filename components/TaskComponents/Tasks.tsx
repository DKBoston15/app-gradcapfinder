import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { AddTask } from "./AddTask";

export const Tasks = ({ active, tasks, selectedProject, projects }: any) => {
  const [upcoming, setUpcoming] = useState(false);
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
    console.log(selectedProject);
    console.log(tasks);
    if (selectedProject === "UPCOMING") {
      setUpcoming(true);
    } else {
      setUpcoming(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    document.title = `${projectName}`;
  });

  if (tasks && !upcoming) {
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
