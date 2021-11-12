import React from "react";

export default function TaskCard({ task }: any) {
  return (
    <div className="bg-white rounded-lg h-full w-full col-span-1 shadow-md p-2 flex flex-col justify-between hover:transform hover:scale-105">
      <div className="font-bold">{task.task}</div>
      <div>
        <span className="text-gray">Due Date:</span> {task.date}
      </div>
    </div>
  );
}
