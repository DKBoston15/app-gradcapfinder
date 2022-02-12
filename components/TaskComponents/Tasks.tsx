import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { AddTask } from "./AddTask";
import moment from "moment";
import { RiEdit2Fill } from "react-icons/ri";
import { isAfter, add, isWithinInterval } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useTaskStore } from "../../store/taskStore";

export const Tasks = ({
  selectedProject,
  projects,
  onSubmitTask,
  onDeleteTask,
  onArchiveTask,
  updateProjectName,
  onEditTask,
  project,
  setProject,
  getProjectName,
  onCompleteTask,
}: any) => {
  const tasks = useTaskStore((state: any) => state.tasks);
  const [projectName, setProjectName] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showProjectEdit, setShowProjectEdit] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [hideAddTask, setHideAddTask] = useState(true);
  const [showAddTaskButton, setShowAddTaskButton] = useState(true);
  const [editingTask, setEditingTask] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState();
  const [currentProject, setCurrentProject] = useState();

  const updateProjectNameFunc = async () => {
    setShowProjectEdit(false);
    await updateProjectName(newProjectName, selectedProject);
    setProjectName(newProjectName);
  };

  useEffect(() => {
    const currentProject = projects.filter(
      // @ts-ignore
      (project) => project.id === selectedProject
    );
    setCurrentProject(currentProject[0]);
    let filteredTasksTemp = tasks.filter(
      // @ts-ignore
      (task) =>
        task.project === selectedProject &&
        task.archived === false &&
        task.completed === false
    );

    if (selectedProject === "ALLTASKS") {
      filteredTasksTemp = tasks.filter(
        // @ts-ignore
        (task) => task.archived === false && task.completed === false
      );
    }

    if (selectedProject === "QUICK TASKS") {
      filteredTasksTemp = tasks.filter(
        // @ts-ignore
        (task) =>
          task.project === 0 &&
          task.archived === false &&
          task.completed === false
      );
    }

    if (selectedProject === "TODAY") {
      let todaysTasks = [];
      for (let index = 0; index < tasks.length; index++) {
        // @ts-ignore
        if (
          moment(tasks[index].due_at).isSame(new Date(), "d") &&
          !tasks[index].archived
        ) {
          todaysTasks.push(tasks[index]);
        }
      }
      filteredTasksTemp = todaysTasks;
    }

    if (selectedProject === "UPCOMING") {
      let futureTasks = [];
      for (let index = 0; index < tasks.length; index++) {
        // @ts-ignore
        let todayDate = new Date();
        let sevenDaysFromNow = new Date();
        sevenDaysFromNow = add(sevenDaysFromNow, { days: 8 });
        // @ts-ignore
        let futureDate = new Date(tasks[index].due_at);
        futureDate = add(futureDate, {
          days: 1,
        });
        if (isAfter(futureDate, todayDate)) {
          if (
            !moment(tasks[index].due_at).isSame(new Date(), "d") &&
            !tasks[index].archived
          ) {
            if (
              isWithinInterval(new Date(tasks[index].due_at), {
                start: todayDate,
                end: sevenDaysFromNow,
              })
            ) {
              futureTasks.push(tasks[index]);
            }
          }
        }
      }
      filteredTasksTemp = futureTasks;
    }

    if (selectedProject === "ARCHIVED") {
      let archivedTasks = [];
      for (let index = 0; index < tasks.length; index++) {
        // @ts-ignore
        if (tasks[index].archived) {
          archivedTasks.push(tasks[index]);
        }
      }
      filteredTasksTemp = archivedTasks;
    }

    if (selectedProject === "COMPLETED") {
      let completedTasks = [];
      for (let index = 0; index < tasks.length; index++) {
        // @ts-ignore
        if (tasks[index].completed) {
          completedTasks.push(tasks[index]);
        }
      }
      filteredTasksTemp = completedTasks;
    }

    if (selectedProject === "QUICK TASKS") {
      setProjectName("Quick Tasks");
      document.title = `Quick Tasks`;
    } else if (selectedProject === "TODAY") {
      setProjectName("Today");
      document.title = `Today`;
    } else if (selectedProject === "UPCOMING") {
      setProjectName("Upcoming");
      document.title = `Upcoming`;
    } else if (selectedProject === "ARCHIVED") {
      setProjectName("Archived");
      document.title = `Archived`;
    } else if (selectedProject === "COMPLETED") {
      setProjectName("Completed");
      document.title = `Completed`;
    } else if (selectedProject === "ALLTASKS") {
      setProjectName("All Tasks");
      document.title = `All Tasks`;
    } else if (currentProject[0]) {
      setProjectName(currentProject[0].name);
      document.title = `${currentProject[0].name}`;
    }
    setFilteredTasks(filteredTasksTemp);
  }, [tasks, selectedProject, onEditTask]);
  if (tasks) {
    return (
      <AnimatePresence>
        <div className="p-8 " data-testid="tasks">
          {!showProjectEdit && (
            <div
              data-testid="project-name"
              className="text-xl mb-8 flex items-center"
            >
              <div>{projectName}</div>
              <div className="ml-2 hover:transform hover:scale-105">
                {currentProject && (
                  <div onClick={() => setShowProjectEdit(true)}>
                    {selectedProject != "QUICK TASKS" &&
                      selectedProject != "TODAY" &&
                      selectedProject != "ALLTASKS" &&
                      selectedProject != "UPCOMING" &&
                      selectedProject != "COMPLETED" &&
                      selectedProject != "ARCHIVED" &&
                      // @ts-ignore
                      currentProject?.standard_id != 1 &&
                      // @ts-ignore
                      currentProject?.standard_id != 2 && (
                        <span className="text-gray cursor-pointer">
                          <RiEdit2Fill />
                        </span>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
          {showProjectEdit && (
            <div className="flex mb-8">
              <input
                placeholder={projectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="outline-black outline-none w-48"
              />
              <button
                className={`font-bold text-white rounded-xl py-2 px-4 my-1 mr-1 text-sm cursor-pointer bg-primary ml-4`}
                type="submit"
                onClick={() => updateProjectNameFunc()}
              >
                Save
              </button>
              <button
                className={`font-bold text-white rounded-xl py-2 px-4 my-1 mr-1 text-sm cursor-pointer bg-gray ml-4`}
                type="submit"
                onClick={() => setShowProjectEdit(false)}
              >
                Cancel
              </button>
            </div>
          )}

          <ul className="space-y-4">
            {filteredTasks.map((task: any) => (
              // @ts-ignore
              <motion.div
                key={`${task.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
              >
                <li className="flex space-x-4 items-center">
                  {/* @ts-ignore */}
                  {selectedProject !== "ARCHIVED" &&
                    selectedProject !== "COMPLETED" && (
                      <Checkbox
                        id={task.id}
                        onArchiveTask={onArchiveTask}
                        onCompleteTask={onCompleteTask}
                      />
                    )}
                  {/* @ts-ignore */}
                  <div
                    className="flex items-center group"
                    onClick={() => {
                      setHideAddTask(false);
                      setShowAddTaskButton(false);
                      setEditingTask(true);
                      setTaskBeingEdited(task);
                    }}
                  >
                    <span className="cursor-pointer">{task.title}</span>
                    <span className="ml-2 text-gray group-hover:block hidden cursor-pointer">
                      <RiEdit2Fill />
                    </span>
                    {task.due_at && (
                      <span className="ml-24 bg-dashGray dark:bg-darkSlateGray rounded-xl px-2 py-1">
                        {task.due_at}
                      </span>
                    )}
                  </div>
                </li>
              </motion.div>
            ))}
          </ul>
          {selectedProject !== "ARCHIVED" &&
            selectedProject !== "COMPLETED" && (
              <AddTask
                selectedProject={selectedProject}
                projects={projects}
                onSubmitTask={onSubmitTask}
                hideAddTask={hideAddTask}
                setHideAddTask={setHideAddTask}
                showAddTaskButton={showAddTaskButton}
                setShowAddTaskButton={setShowAddTaskButton}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                taskBeingEdited={taskBeingEdited}
                setTaskBeingEdited={setTaskBeingEdited}
                onEditTask={onEditTask}
                project={project}
                setProject={setProject}
                onArchiveTask={onArchiveTask}
              />
            )}
        </div>
      </AnimatePresence>
    );
  }
  return <div></div>;
};
