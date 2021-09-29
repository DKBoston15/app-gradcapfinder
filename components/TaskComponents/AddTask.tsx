import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import firebase from "../../firebase";
import { useSelectedProjectValue } from "../../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";
import { useAuthState } from "react-firebase-hooks/auth";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}: any) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [hideAddTask, setHideAddTask] = useState(true);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: user?.uid,
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && hideAddTask && (
        <div
          className="add-task__shallow"
          data-testid="show-main-action"
          //   @ts-ignore
          onClick={() => {
            setShowMain(!showMain);
            setHideAddTask(!hideAddTask);
          }}
          onKeyDown={(e) => {
            //   @ts-ignore
            if (e.key === "Enter") setShowMain(!showMain);
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="text-primary">+</span>
          <span className="ml-4 text-gray">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <div>
            <div className="border-2 border-gray rounded-lg p-2 flex flex-col mb-4">
              <input
                className="add-task__content"
                aria-label="Enter your task"
                data-testid="add-task-content"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <div className="flex justify-end">
                <span
                  className="mr-2"
                  data-testid="show-project-overlay"
                  onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      setShowProjectOverlay(!showProjectOverlay);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <FaRegListAlt />
                </span>
                <span
                  className=""
                  data-testid="show-task-date-overlay"
                  onClick={() => setShowTaskDate(!showTaskDate)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setShowTaskDate(!showTaskDate);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <FaRegCalendarAlt />
                </span>
              </div>
            </div>
            <button
              type="button"
              className="text-white text-md bg-primary rounded-lg py-1 px-2 filter hover:brightness-90"
              data-testid="add-task"
              onClick={() =>
                showQuickAddTask
                  ? addTask() && setShowQuickAddTask(false)
                  : addTask()
              }
            >
              Add Task
            </button>
            {!showQuickAddTask && (
              <span
                className="text-md ml-4 border-2 py-1 px-2 border-gray rounded-lg"
                data-testid="add-task-main-cancel"
                onClick={() => {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                  setHideAddTask(!hideAddTask);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setHideAddTask(!hideAddTask);
                  }
                }}
                aria-label="Cancel adding a task"
                tabIndex={0}
                role="button"
              >
                Cancel
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
