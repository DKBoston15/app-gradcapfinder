import React from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../../hooks";

export default function Tasks() {
  const { tasks } = useTasks("1");
  console.log(tasks);
  let projectName = "";
  return (
    <div data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul>
        {tasks.map((task: any) => (
          <li key={`${task.id}`}>
            {/* @ts-ignore */}
            <Checkbox id={tasks.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
