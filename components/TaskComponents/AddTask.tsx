import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { format, addDays } from "date-fns";
import firebase from "../../firebase";
import { useSelectedProjectValue } from "../../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

export default function AddTask({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}: any) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = format(new Date(), "MM/dd/yyyy");
    } else if (projectId === "NEXT_7") {
      // @ts-ignore
      collatedDate = addDays(format(new Date(), "MM/dd/yyyy"), 7);
    }
    console.log(collatedDate);
    console.log(taskDate);
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
          setShowMain(false);
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div>
      {showAddTaskMain && (
        <div onClick={() => setShowMain(!showMain)}>
          <span>+</span>
          <span>Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div>
          {showQuickAddTask && (
            <>
              <div>
                <h2>Quick Add Task</h2>
                <span
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
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
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" onClick={() => addTask()}>
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span onClick={() => setShowProjectOverlay(!showProjectOverlay)}>
            <FaRegListAlt />
          </span>
          <span onClick={() => setShowTaskDate(!showTaskDate)}>
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
}
