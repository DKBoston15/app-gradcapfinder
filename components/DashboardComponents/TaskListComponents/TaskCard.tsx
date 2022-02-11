import React, { useState, useEffect } from "react";

export default function TaskCard({ task, getProjectName }: any) {
  const [truncatedTitle, setTruncatedTitle] = useState("");
  const [projectName, setProjectName] = useState("a");

  useEffect(() => {
    if (task.title.length > 34) {
      setTruncatedTitle(task.title.substring(0, 34) + "...");
    } else {
      setTruncatedTitle(task.title);
    }

    const getName = async (id: any) => {
      const name = await getProjectName(id);
      if (name) {
        if (name.length > 34) {
          setProjectName(name.substring(0, 30) + "...");
        } else {
          setProjectName(name);
        }
      }
    };

    getName(task.project);
  }, [task]);

  return (
    <div className="bg-white dark:bg-black rounded-lg h-full w-full col-span-1 shadow-md p-2 flex flex-col justify-between h-24">
      <div className="font-bold">{truncatedTitle}</div>
      <div>
        <span className="text-gray">Due Date:</span> {task.due_at}
      </div>
      {projectName !== "Unassigned" && (
        <div className="space-x-2 flex items-center">
          <span className="font-bold mr-1">Project:</span> {projectName}
        </div>
      )}
      {projectName === "Unassigned" && (
        <div className="space-x-2 flex items-center">
          <span className="font-bold mr-1">General Task</span>
        </div>
      )}
    </div>
  );
}
