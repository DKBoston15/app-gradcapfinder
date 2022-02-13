import React from "react";

export default function Checkbox({ id, onArchiveTask, onCompleteTask }: any) {
  const completeTask = async () => {
    await onCompleteTask(id);
  };
  return (
    <div
      className="w-4 h-4 text-3xl rounded-full border-2 border-gray-400 hover:bg-green cursor-pointer hover:w-5 hover:h-5"
      onClick={() => completeTask()}
    >
      <span className="checkbox" />
    </div>
  );
}
