import React, { useEffect, useState } from "react";
import firebase from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TaskCard from "./TaskCard";

export default function TasksDue({ setCurrentPage }: any) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState();
  function byField(fieldName: any) {
    // @ts-ignore
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  }

  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        const tasksRef = firebase
          .firestore()
          .collection("tasks")
          .where("userId", "==", user.uid)
          .limit(8);
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

        setTaskCount(taskArray.length);
        setTasks(taskArray.sort(byField("date")));
      };
      getTasks();
    }
  }, []);

  return (
    <div className="bg-dashGray w-1/2 rounded-xl p-5">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl flex items-center">
          <span>Tasks due soon</span>
          <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
            {taskCount}
          </span>
        </span>
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
          onClick={() => setCurrentPage("Tasks")}
        >
          View All
        </button>
      </div>
      {tasks.length === 0 && (
        <div className="flex flex-col items-center mt-20 text-xl font-semibold">
          <div>You are all caught up!</div>
          <div>No tasks due in the future!</div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 h-4/5 mt-4">
        {tasks.length > 0 && tasks.map((task: any) => <TaskCard task={task} />)}
      </div>
    </div>
  );
}
