import React from "react";
import firebase from "../../firebase";

export default function Checkbox({ id }: any) {
  const archiveTask = () => {
    firebase.firestore().collection("tasks").doc(id).update({ archived: true });
  };
  return (
    <div onClick={() => archiveTask()} data-testid="checkbox-action">
      <span />
    </div>
  );
}
