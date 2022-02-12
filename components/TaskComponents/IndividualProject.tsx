import React, { useState } from "react";
import { FaTrashAlt, FaUserAlt, FaBook } from "react-icons/fa";
import Modal from "./Modal";

export default function IndividualProject({
  project,
  active,
  index,
  onDeleteProject,
  setSelectedProject,
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

  return (
    <>
      <div
        onClick={() => setSelectedProject(project.id)}
        className={`flex flex-col group hover:bg-white dark:hover:bg-black cursor-pointer rounded-md px-4 py-2 ${
          active == project.id ? "bg-white dark:bg-black" : ""
        }`}
      >
        <div className="flex justify-between">
          <div className="space-x-2 flex items-center">
            {project.standard_id == 1 && (
              <span className="text-turq">
                <FaUserAlt />
              </span>
            )}
            {project.standard_id == 2 && (
              <span className="text-carrot">
                <FaBook />
              </span>
            )}
            {project.standard_id != 1 && project.standard_id != 2 && (
              <div
                className="rounded-full w-2 h-2 absolute"
                style={{ backgroundColor: colorKey[index] }}
              />
            )}
            <span className="pl-2">{project.name}</span>
          </div>
          {project.standard_id != 1 && project.standard_id != 2 && (
            <span
              className="hidden group-hover:flex flex items-center"
              onClick={() => {
                setShowConfirm(!showConfirm);
              }}
            >
              <FaTrashAlt />
            </span>
          )}
        </div>
        {showConfirm && project.standard_id != 1 && (
          <Modal
            onDeleteProject={onDeleteProject}
            setShowConfirm={setShowConfirm}
            showConfirm={showConfirm}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        )}
      </div>
    </>
  );
}
