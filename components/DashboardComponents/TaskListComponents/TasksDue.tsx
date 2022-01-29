import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { supabaseClient } from "../../../lib/client";
import moment from "moment";
import { isAfter, add } from "date-fns";

export default function TasksDue({ setCurrentPage }: any) {
  const user = supabaseClient.auth.user();
  const [tasks, setTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  function byField(fieldName: any) {
    // @ts-ignore
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  }

  // Get Tasks
  useEffect(() => {
    if (user) {
      supabaseClient
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .order("title", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            let futureTasks = [];
            // @ts-ignore
            for (let index = 0; index < data.length; index++) {
              // @ts-ignore
              let todayDate = new Date();
              // @ts-ignore
              let futureDate = new Date(data[index].due_at);
              futureDate = add(futureDate, {
                days: 1,
              });
              if (isAfter(futureDate, todayDate)) {
                if (
                  // @ts-ignore
                  !data[index].archived
                ) {
                  // @ts-ignore
                  futureTasks.push(data[index]);
                }
              }
            }
            // @ts-ignore
            if (futureTasks.length > 8) {
              // @ts-ignore
              setTaskCount("8+");
            } else {
              // @ts-ignore
              setTaskCount(futureTasks.length);
            }

            futureTasks.length = 8;
            setTasks(
              // @ts-ignore
              futureTasks.sort((a, b) => (a.due_at > b.due_at ? 1 : -1))
            );
          }
        });
    }
  }, [setCurrentPage, user]);

  // Subscribe to Tasks
  useEffect(() => {
    const tasksListener = supabaseClient
      .from("tasks")
      .on("*", (payload) => {
        const newTask = payload.new;
        const oldTasks = payload.old;
        if (
          Object.keys(newTask).length === 0 &&
          Object.keys(oldTasks).length === 0
        ) {
          setTasks([]);
        } else if (Object.keys(newTask).length === 0) {
          return;
        }
        // @ts-ignore
        setTasks((oldTasks) => {
          let newTasks = [];
          newTasks = [...oldTasks, newTask];
          const lookup = newTasks.reduce((a, e) => {
            // @ts-ignore
            a[e.id] = ++a[e.id] || 0;
            return a;
          }, {});
          // @ts-ignore
          const duplicateTasks = newTasks.filter((e) => lookup[e.id]);
          if (duplicateTasks.length !== 0) {
            const taskToBeAdded =
              duplicateTasks[0].updated_at > duplicateTasks[1].updated_at
                ? duplicateTasks[0]
                : duplicateTasks[1];
            newTasks = newTasks.filter((task) => task.id !== taskToBeAdded.id);
            newTasks = [...newTasks, taskToBeAdded];
          }
          return newTasks;
        });
      })
      .subscribe();

    return () => {
      tasksListener.unsubscribe();
    };
  }, []);

  return (
    <div className="bg-dashGray w-1/2 rounded-xl p-5">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl flex items-center">
          <span>Tasks due soon</span>
          <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
            {taskCount || 0}
          </span>
        </span>
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
          onClick={() => setCurrentPage("Tasks")}
        >
          View All
        </button>
      </div>
      {taskCount == 0 && (
        <div className="flex flex-col items-center mt-20 text-xl font-semibold">
          <div>You are all caught up!</div>
          <div>No tasks due in the future!</div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 h-4/5 mt-4">
        {taskCount > 0 &&
          tasks.map((task: any) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}
