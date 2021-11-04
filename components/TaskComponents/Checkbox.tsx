import React from "react";
import firebase from "../../firebase";

export default function Checkbox({ id }: any) {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({ archived: true });
  };
  return (
    <div
      className="w-4 h-4 rounded-full border-2 border-gray-400"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
}
