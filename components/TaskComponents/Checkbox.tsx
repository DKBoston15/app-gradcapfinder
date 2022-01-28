import React from "react";

export default function Checkbox({ id, onArchiveTask }: any) {
  const archiveTask = async () => {
    await onArchiveTask(id);
  };
  return (
    <div
      className="w-4 h-4 rounded-full border-2 border-gray-400"
      onClick={() => archiveTask()}
    >
      <span className="checkbox" />
    </div>
  );
}
