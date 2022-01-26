import React, { useState, useEffect } from "react";

export default function TaskCard({ task }: any) {
  const [truncatedTitle, setTruncatedTitle] = useState("");

  useEffect(() => {
    if (task.title.length > 34) {
      setTruncatedTitle(task.title.substring(0, 34) + "...");
    } else {
      setTruncatedTitle(task.title);
    }
  }, [task]);

  return (
    <div className="bg-white rounded-lg h-full w-full col-span-1 shadow-md p-2 flex flex-col justify-between hover:transform hover:scale-105 max-h-20">
      <div className="font-bold">{truncatedTitle}</div>
      <div>
        <span className="text-gray">Due Date:</span> {task.due_at}
      </div>
    </div>
  );
}
