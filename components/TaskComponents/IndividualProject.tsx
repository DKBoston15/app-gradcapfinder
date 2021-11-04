import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import firebase from "../../firebase";
import Modal from "./Modal";

export default function IndividualProject({
  project,
  active,
  index,
  projects,
  setProjects,
  setSelectedProject,
  tasks,
  triggerRender,
  setTriggerRender,
}: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const colorKey = [
    "#eb4d4b",
    "#6ab04c",
    "#95afc0",
    "#686de0",
    "#e056fd",
    "#f9ca24",
    "#130f40",
    "#4834d4",
    "#22a6b3",
    "#ffbe76",
    "#686de0",
    getRandomColor(),
  ];

  const deleteProject = (docId: any) => {
    const archiveTask = (id: any) => {
      firebase
        .firestore()
        .collection("tasks")
        .doc(id)
        .update({ archived: true });
    };
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
        setShowConfirm(false);
        setTriggerRender(!triggerRender);
      });

    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        // @ts-ignore
        archiveTask(tasks[i].id);
      }
    }
  };

  return (
    <>
      <div
        className={`flex flex-col group hover:bg-white cursor-pointer rounded-md px-4 py-2 ${
          active == project.projectId ? "bg-white" : ""
        }`}
      >
        <div className="flex justify-between">
          <div className="space-x-2 flex items-center">
            <div
              className="rounded-full w-2 h-2"
              style={{ backgroundColor: colorKey[index] }}
            />
            <span>{project.name}</span>
          </div>
          <span
            className="hidden group-hover:flex flex items-center"
            onClick={() => {
              setShowConfirm(!showConfirm);
            }}
          >
            <FaTrashAlt />
          </span>
        </div>
        {showConfirm && (
          <Modal
            deleteProject={deleteProject}
            setShowConfirm={setShowConfirm}
            showConfirm={showConfirm}
            project={project}
          />
        )}
      </div>
    </>
  );
}
