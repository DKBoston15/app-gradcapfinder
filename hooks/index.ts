import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
import { db } from "../firebase";
import { format, differenceInDays } from "date-fns";
import { collatedTasksExist } from "../helpers";

export const useTasks = (selectedProject: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

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
              format(new Date(), "DD/MM/YYYY")
            ))
          : selectedProject === "INBOX" || selectedProject === 0
          ? (unsubscribe = unsubscribe.where("date", "==", ""))
          : unsubscribe;

      //@ts-ignore
      unsubscribe = unsubscribe.onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        //@ts-ignore
        setTasks(
          //@ts-ignore
          selectedProject === "NEXT_7"
            ? newTasks.filter(
                (task) =>
                  differenceInDays(
                    //@ts-ignore
                    format(task.date, "DD/MM/YYYY"),
                    format(new Date(), "DD/MM/YYYY")
                    //@ts-ignore
                  ) <= 7 && task.archived !== true
              )
            : //@ts-ignore
              newTasks.filter((task) => task.archived !== true)
        );
        //@ts-ignore
        setArchivedTasks(newTasks.filter((task) => task.archived !== false));
      });

      //@ts-ignore
      return () => unsubscribe();
    }, [selectedProject]);
  }
  return { tasks, archivedTasks };
};

// const selectedProject = 1;
// const {tasks, archivedTasks} = useTasks(selectedProject);

export const useProjects = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [projects, setProjects] = useState([]);

  if (user) {
    useEffect(() => {
      firebase
        .firestore()
        .collection("projects")
        .where("userId", "==", user.uid)
        .orderBy("projectId")
        .get()
        .then((snapshot) => {
          const allProjects = snapshot.docs.map((projects) => ({
            ...projects.data(),
            docId: projects.id,
          }));
          if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
            //@ts-ignore
            setProjects(allProjects);
          }
        });
    }, [projects]);

    return { projects, setProjects };
  }
};
