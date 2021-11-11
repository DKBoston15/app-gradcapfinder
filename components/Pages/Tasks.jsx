/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase";
import { db } from "../../firebase";
import Content from "../TaskComponents/Content";
import { collatedTasksExist } from "../../helpers";
import moment from "moment";

export default function Tasks() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("INBOX");
  const [active, setActive] = useState("inbox");
  const [triggerRender, setTriggerRender] = useState(false);
  const [triggerTaskRender, setTriggerTaskRender] = useState(false);

  useEffect(() => {
    if (user) {
      let unsubscribe = firebase
        .firestore()
        .collection("tasks")
        .where("userId", "==", user.uid);
      unsubscribe =
        selectedProject && !collatedTasksExist(selectedProject)
          ? (unsubscribe = unsubscribe.where(
              "projectId",
              "==",
              selectedProject
            ))
          : selectedProject === "TODAY"
          ? (unsubscribe = unsubscribe.where(
              "date",
              "==",
              moment().format("MM/DD/YYYY")
            ))
          : selectedProject === "INBOX" || selectedProject === 0
          ? (unsubscribe = unsubscribe.where("date", "==", ""))
          : unsubscribe;

      unsubscribe = unsubscribe.onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        let tempTasks;
        if (selectedProject === "ARCHIVED") {
          let data = newTasks.filter((task) => task.archived == true);
          tempTasks = data;
        } else if (selectedProject === "INBOX") {
          let data = newTasks.filter((task) => task.projectId === "INBOX");
          tempTasks = data;
        } else {
          let data = newTasks.filter((task) => task.archived !== true);
          tempTasks = data;
        }
        setTasks(tempTasks);
        setArchivedTasks(newTasks.filter((task) => task.archived !== false));
      });
      return () => unsubscribe();
    }
  }, [selectedProject]);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("projects")
        .where("userId", "==", user.uid)
        .orderBy("projectId")
        .get()
        .then((snapshot) => {
          const allProjects = snapshot.docs.map((project) => ({
            ...project.data(),
            docId: project.id,
          }));

          if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
            allProjects.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
            setProjects(allProjects);
          }
        });
    }
  }, [triggerRender]);

  if (tasks) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        {
          <Content
            active={active}
            setActive={setActive}
            setSelectedProject={setSelectedProject}
            projects={projects}
            setProjects={setProjects}
            triggerRender={triggerRender}
            setTriggerRender={setTriggerRender}
            triggerRender={triggerRender}
            triggerTaskRender={triggerTaskRender}
            setTriggerTaskRender={setTriggerTaskRender}
            selectedProject={selectedProject}
            tasks={tasks}
          />
        }
      </div>
    );
  }
}
