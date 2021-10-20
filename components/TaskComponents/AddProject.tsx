import React, { useState } from "react";
import firebase from "../../firebase";
import { generatePushId } from "../../helpers";
import { useProjectsValue } from "../../context";
import { useAuthState } from "react-firebase-hooks/auth";

export const AddProject = ({ shouldShow = false }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");
  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection("projects")
      .add({
        projectId,
        name: projectName,
        userId: user?.uid,
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName("");
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="flex flex-col mt-4" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="my-2 h-8 pl-4"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <div className="mt-2">
            <button
              className="text-white text-sm bg-primary rounded-sm py-1 px-2 filter hover:brightness-90"
              type="button"
              onClick={() => addProject()}
              data-testid="add-project-submit"
            >
              Add Project
            </button>
            <span
              aria-label="Cancel adding project"
              data-testid="hide-project-overlay"
              className="ml-4 text-gray"
              onClick={() => setShow(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShow(false);
              }}
              role="button"
              tabIndex={0}
            >
              Cancel
            </span>
          </div>
        </div>
      )}
      <div className="mt-8 flex items-center">
        {projects.length < 7 && (
          <>
            <span className="text-primary">+</span>
            <span
              aria-label="Add Project"
              data-testid="add-project-action"
              className="ml-4 text-gray"
              onClick={() => setShow(!show)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShow(!show);
              }}
              role="button"
              tabIndex={0}
            >
              Add Project
            </span>
          </>
        )}
        {projects.length == 7 && (
          <>
            <span className="ml-4 text-gray">Project Limit Reached</span>
          </>
        )}
      </div>
    </div>
  );
};
