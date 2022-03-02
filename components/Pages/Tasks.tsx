/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Content from "../TaskComponents/Content";
import { supabaseClient } from "../../lib/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import useSound from "use-sound";
import Dropdown from "../Dropdown";
import { useTaskStore } from "../../store/taskStore";

export default function Tasks({ setCurrentPage }: any) {
  const tasks = useTaskStore((state: any) => state.tasks);
  const projects = useTaskStore((state: any) => state.projects);
  const getTasks = useTaskStore((state: any) => state.getTasks);
  const addTask = useTaskStore((state: any) => state.addTask);
  const deleteTask = useTaskStore((state: any) => state.deleteTask);
  const editTask = useTaskStore((state: any) => state.editTask);
  const archiveTask = useTaskStore((state: any) => state.archiveTask);
  const completeTask = useTaskStore((state: any) => state.completeTask);
  const addProject = useTaskStore((state: any) => state.addProject);
  const deleteProject = useTaskStore((state: any) => state.deleteProject);
  const addUnassignedProject = useTaskStore(
    (state: any) => state.addUnassignedProject
  );
  const addPersonalProject = useTaskStore(
    (state: any) => state.addPersonalProject
  );
  const addDissertationProject = useTaskStore(
    (state: any) => state.addDissertationProject
  );
  const updateProjectNameStore = useTaskStore(
    (state: any) => state.updateProjectNameStore
  );
  const getProjectName = useTaskStore((state: any) => state.getProjectName);

  useEffect(() => {
    const realtimeProjectUpdates = supabaseClient
      .from("projects")
      .on("*", (payload) => {
        const getProjects = useTaskStore.getState().getProjects;
        getProjects();
      })
      .subscribe();

    const realtimeTaskUpdates = supabaseClient
      .from("tasks")
      .on("*", (payload) => {
        const getTasks = useTaskStore.getState().getTasks;
        getTasks();
      })
      .subscribe();
  }, []);

  const [project, setProject] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [selectedProject, setSelectedProject] = useState("QUICK TASKS");
  const user = supabaseClient.auth.user();
  const [play] = useSound("/sounds/woosh.mp3", {
    volume: 0.2,
  });

  const checkIfSound = () => {
    if (soundEffects) {
      play();
    }
  };

  const updateProjectName = async (name: any, id: any) => {
    await updateProjectNameStore(name, id);
    toast.success("Project Updated!", {
      theme: "colored",
    });
  };

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error, status } = await supabaseClient
          .from("profiles")
          .select(`sound_effects`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setSoundEffects(data.sound_effects);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, [user]);

  // Add Task
  const onSubmitTask = async (
    title: string,
    project: string,
    created_at: Date,
    updated_at: Date,
    due_at: Date
  ) => {
    if (!title) {
      toast.error("Task cannot be empty", {
        theme: "colored",
      });
    } else {
      await addTask(title, project, created_at, updated_at, due_at);
      toast.success("Task Created!", {
        theme: "colored",
      });
      await getTasks();
    }
  };

  // Delete Task
  const onDeleteTask = async (id: any) => {
    await deleteTask(id);
  };

  // Update Task
  const onEditTask = async (
    id: any,
    title: string,
    project: any,
    due_at: string
  ) => {
    await editTask(id, title, project, due_at);
    toast.success("Task Updated!", {
      theme: "colored",
    });
  };

  // Complete Task
  const onCompleteTask = async (id: any) => {
    await completeTask(id);
    checkIfSound();
    toast.success("Task Completed!", {
      theme: "colored",
    });
    if (!showConfetti) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3500);
    }
  };

  // Archive Task
  const onArchiveTask = async (id: any) => {
    await archiveTask(id);
    checkIfSound();
    toast.success("Task Archived!", {
      theme: "colored",
    });
  };

  // Get Projects
  useEffect(() => {
    if (user) {
      supabaseClient
        .from("projects")
        .select("*")
        .eq("user_id", user?.id)
        .order("name", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            let arr = [];
            // @ts-ignore
            for (let i = 0; i < data.length; i++) {
              // @ts-ignore
              arr.push(data[i].standard_id);
            }
            if (!arr.includes(0)) {
              addUnassignedProject();
            }
            if (!arr.includes(1)) {
              addPersonalProject();
            }
            if (!arr.includes(2)) {
              addDissertationProject();
            }
          }
        });
    }
  }, [user]);

  // Add Project
  const onSubmitProject = async (name: string) => {
    await addProject(name);
    toast.success("Project Added!", {
      theme: "colored",
    });
  };

  // Delete Project
  const onDeleteProject = async (id: any) => {
    await deleteProject(id, tasks);
    toast.success("Project Deleted!", {
      theme: "colored",
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {
        <>
          {showConfetti && <Confetti />}

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="absolute right-4 top-4">
            <Dropdown setCurrentPage={setCurrentPage} user={user} />
          </div>
          <Content
            projects={projects}
            onSubmitProject={onSubmitProject}
            onDeleteProject={onDeleteProject}
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            onEditTask={onEditTask}
            onSubmitTask={onSubmitTask}
            onDeleteTask={onDeleteTask}
            onArchiveTask={onArchiveTask}
            updateProjectName={updateProjectName}
            project={project}
            setProject={setProject}
            getProjectName={getProjectName}
            onCompleteTask={onCompleteTask}
          />
        </>
      }
    </div>
  );
}
