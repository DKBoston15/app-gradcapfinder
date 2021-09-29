/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import moment from "moment";
import firebase from "../firebase";
import { collatedTasksExist } from "../helpers";
import { useAuthState } from "react-firebase-hooks/auth";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [user, loading, error] = useAuthState(firebase.auth());

  if (user) {
    useEffect(() => {
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
              moment().format("DD/MM/YYYY")
            ))
          : selectedProject === "INBOX" || selectedProject === 0
          ? (unsubscribe = unsubscribe.where("date", "==", ""))
          : unsubscribe;

      unsubscribe = unsubscribe.onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(
          selectedProject === "NEXT_7"
            ? newTasks.filter(
                (task) =>
                  moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                  task.archived !== true
              )
            : newTasks.filter((task) => task.archived !== true)
        );
        setArchivedTasks(newTasks.filter((task) => task.archived !== false));
      });

      return () => unsubscribe();
    }, [selectedProject]);
  }

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, loading, error] = useAuthState(firebase.auth());
  if (user) {
    useEffect(() => {
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
            setProjects(allProjects);
          }
        });
    }, [projects]);
  }
  projects.sort((a, b) => {
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
  return { projects, setProjects };
};
