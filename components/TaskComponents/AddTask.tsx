import React, { useState, useEffect } from "react";
import moment from "moment";
import { ProjectOverlay } from "./ProjectOverlay";
import { motion } from "framer-motion";
import { camelCase } from "../../helpers";

export const AddTask = ({
  selectedProject,
  projects,
  onSubmitTask,
  hideAddTask,
  setHideAddTask,
  showAddTaskButton,
  setShowAddTaskButton,
  editingTask,
  setEditingTask,
  taskBeingEdited,
  setTaskBeingEdited,
  onEditTask,
  project,
  setProject,
  onArchiveTask,
}: any) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [projectName, setProjectName] = useState("Quick Tasks");
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);

  const truncateProjectName = (name: string) => {
    if (name.length > 34) {
      return name.substring(0, 34) + "...";
    } else {
      return name;
    }
  };

  const updateProjectName = () => {
    const currentProject = projects.filter(
      //@ts-ignore
      (workingProject) => workingProject.id === selectedProject
    );
    if (currentProject.length > 0) {
      setProjectName(currentProject[0].name);
    } else {
      setProjectName(camelCase(selectedProject));
    }
  };

  useEffect(() => {
    if (taskBeingEdited) {
      setTask(taskBeingEdited.title);
      //@ts-ignore
      setTaskDate(moment(taskBeingEdited.due_at).format("yyyy-MM-DD"));
      setProject(taskBeingEdited.project);
      const editingProject = projects.filter(
        //@ts-ignore
        (workingProject) => workingProject.id === selectedProject
      );
      if (editingProject.length > 0) {
        setProjectName(editingProject[0].name);
      } else {
        setProjectName(camelCase(selectedProject));
      }
    }
  }, [editingTask, taskBeingEdited]);

  const archiveTask = async (id: any) => {
    await onArchiveTask(id);
    setTask("");
    setShowProjectOverlay(false);
    setShowAddTaskButton(true);
    setHideAddTask(true);
    setEditingTask(false);
    setTaskBeingEdited();
  };

  const addTask = async () => {
    const projectId = typeof project === "number" ? project : 0;
    if (editingTask) {
      await onEditTask(taskBeingEdited.id, task, projectId, taskDate || null);
    } else {
      await onSubmitTask(
        task,
        projectId,
        new Date(),
        new Date(),
        {},
        taskDate || null
      );
    }

    setTask("");
    setShowProjectOverlay(false);
    setShowAddTaskButton(true);
    setHideAddTask(true);
    setEditingTask(false);
    setTaskBeingEdited();
  };

  const dateChange = (date: any) => {
    setTaskDate(moment(date.target.value).format("YYYY-MM-DD"));
  };
  return (
    <div>
      {showAddTaskButton && (
        <div
          className=" mt-4 cursor-pointer hover:transform hover:scale-105"
          onClick={() => {
            setHideAddTask(false);
            setShowAddTaskButton(false);
            //@ts-ignore
            setTask("");
            //@ts-ignore
            setTaskDate(null);
            updateProjectName();
          }}
        >
          <span className="text-primary">+</span>
          <span className="ml-4 text-gray">Add Task</span>
        </div>
      )}
      {!hideAddTask && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <div className="mt-8">
            <div className="border-2 border-gray rounded-lg p-2 flex flex-col mb-4 w-2xl h-28 justify-between">
              <textarea
                className="outline-none resize-none dark:bg-black"
                placeholder="e.g., Select Authors for Literature Review"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <div className="flex justify-end">
                <span>
                  <span
                    onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                    className={`border-2 rounded-lg py-1 px-2 ${
                      showProjectOverlay ? "border-black" : "border-gray"
                    }`}
                  >
                    {truncateProjectName(projectName)}
                  </span>
                  <ProjectOverlay
                    setProject={setProject}
                    showProjectOverlay={showProjectOverlay}
                    setShowProjectOverlay={setShowProjectOverlay}
                    projects={projects}
                    setProjectName={setProjectName}
                    projectName={projectName}
                  />
                  <input
                    className="border-2 border-gray bg-white rounded-lg ml-2 dark:bg-black"
                    style={{ width: "150px" }}
                    value={taskDate}
                    type="date"
                    // @ts-ignore
                    onChange={(date) => dateChange(date)}
                  />
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <button
                  type="button"
                  className={`text-white text-md bg-red-700 rounded-lg py-1 px-2 filter hover:brightness-90 ${
                    !editingTask ? "hidden" : ""
                  }`}
                  onClick={() => archiveTask(taskBeingEdited.id)}
                >
                  {editingTask && <span>Archive Task</span>}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="text-white text-md bg-primary rounded-lg py-1 px-2 filter hover:brightness-90"
                  onClick={() => addTask()}
                >
                  {!editingTask && <span>Add Task</span>}
                  {editingTask && <span>Edit Task</span>}
                </button>

                <span
                  className="text-md ml-4 border-2 py-1 px-2 border-gray rounded-lg"
                  onClick={() => {
                    setHideAddTask(true);
                    setShowAddTaskButton(true);
                    setEditingTask(false);
                  }}
                >
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
