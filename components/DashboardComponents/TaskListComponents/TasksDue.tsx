import React, { useEffect, useState } from "react";
import firebase from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCard from "./TaskCard";

export default function TasksDue({ setCurrentPage }: any) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  function byField(fieldName: any) {
    // @ts-ignore
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  }

  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        let tasks = firebase
          .firestore()
          .collection("tasks")
          .where("userId", "==", user.uid);

        const tasksRef = firebase
          .firestore()
          .collection("tasks")
          .where("userId", "==", user.uid);
        const snapshot = await tasksRef.get();
        const taskArray: any = [];
        snapshot.forEach((doc) => {
          const date1 = new Date();
          const date2 = new Date(doc.data().date);
          // @ts-ignore
          const diffTime = Math.abs(date2 - date1);

          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 1) {
            taskArray.push(doc.data());
          }
        });
        setTasks(taskArray.sort(byField("date")));
        console.log(taskArray);
      };
      getTasks();
    }
  }, []);

  return (
    <div className="bg-dashGray w-1/2 rounded-xl p-5">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl">Tasks due soon</span>{" "}
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white`}
          onClick={() => setCurrentPage("Tasks")}
        >
          View All
        </button>
      </div>
      <div className="flex h-3/5 justify-between mt-8">
        {tasks.length > 0 && tasks.map((task: any) => <TaskCard task={task} />)}
      </div>
    </div>
  );
}
