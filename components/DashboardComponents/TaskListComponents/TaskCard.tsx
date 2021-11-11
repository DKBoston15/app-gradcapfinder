import React from "react";

export default function TaskCard({ task }: any) {
  return (
    <div className="bg-white rounded-lg h-full w-full mr-4">
      <div>{task.task}</div>
      <div>{task.date}</div>
    </div>
  );
}
