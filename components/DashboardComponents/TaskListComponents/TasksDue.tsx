import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { supabaseClient } from "../../../lib/client";
import { isAfter, add, isWithinInterval } from "date-fns";
import { useTaskStore } from "../../../store/taskStore";

export default function TasksDue({ setCurrentPage }: any) {
  const tasks = useTaskStore((state: any) => state.tasks);
  const getProjectNameStore = useTaskStore(
    (state: any) => state.getProjectName
  );
  const user = supabaseClient.auth.user();
  // const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [taskCountDisplay, setTaskCountDisplay] = useState("0");

  function byField(fieldName: any) {
    // @ts-ignore
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  }

  const getProjectName = async (projectId: number) => {
    return await getProjectNameStore(projectId);
  };

  // Get Tasks
  useEffect(() => {
    if (user) {
      // @ts-ignore
      let futureTasks = [];
      // @ts-ignore
      for (let index = 0; index < tasks.length; index++) {
        // @ts-ignore
        let todayDate = new Date();
        let sevenDaysFromNow = new Date();
        sevenDaysFromNow = add(sevenDaysFromNow, { days: 8 });
        // @ts-ignore
        let futureDate = new Date(tasks[index].due_at);
        futureDate = add(futureDate, {
          days: 2,
        });
        if (isAfter(futureDate, todayDate)) {
          if (
            // @ts-ignore
            !tasks[index].archived
          ) {
            if (
              // @ts-ignore
              isWithinInterval(new Date(tasks[index].due_at), {
                start: todayDate,
                end: sevenDaysFromNow,
              })
            ) {
              // @ts-ignore
              futureTasks.push(tasks[index]);
            }
          }
        }
      }
      // @ts-ignore
      if (futureTasks.length > 4) {
        // @ts-ignore
        setTaskCount(4);
        setTaskCountDisplay("4+");
      } else {
        // @ts-ignore
        setTaskCount(futureTasks.length);
        setTaskCountDisplay(`${futureTasks.length}`);
      }

      futureTasks = futureTasks.sort((a, b) => (a.due_at > b.due_at ? 1 : -1));
      futureTasks.length = 4;
      // @ts-ignore
      setFilteredTasks(futureTasks);
    }
  }, [setCurrentPage, user, tasks]);

  return (
    <div className="bg-dashGray dark:bg-darkSlateGray w-1/2 rounded-xl p-5 h-84">
      <div className="flex justify-between w-full">
        <span className="font-semibold text-2xl flex items-center">
          <span className="">Upcoming Tasks</span>
          <span className="ml-2 text-sm bg-primary text-white rounded-full px-2 py-1">
            {taskCountDisplay || 0}
          </span>
        </span>
        <button
          className={`font-bold text-black rounded-lg py-2 px-4 my-1 mr-1 text-md cursor-pointer bg-white dark:bg-primary hover:bg-primary hover:text-white hover:transition hover:ease-in hover:duration-200 hover:scale-105`}
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
      <div className="grid grid-cols-2 gap-4 h-3/5 mt-4">
        {taskCount > 0 &&
          filteredTasks.map((task: any) => (
            <TaskCard
              key={task.id}
              task={task}
              getProjectName={getProjectName}
            />
          ))}
      </div>
    </div>
  );
}
