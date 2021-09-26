import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useProjectsValue, useSelectedProjectValue } from "../../context";
import firebase from "../../firebase";
import Modal from "./Modal";

export default function IndividualProject({ project }: any) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId: any) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="space-x-2">
            <span>•</span>
            <span>{project.name}</span>
          </div>
          <span
            data-testid="delete-project"
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
