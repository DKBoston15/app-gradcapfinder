/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Content from "../TaskComponents/Content";
import { supabaseClient } from "../../lib/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import useSound from "use-sound";
import Dropdown from "../Dropdown";

export default function Tasks({ setCurrentPage }: any) {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEffects, setSoundEffects] = useState(false);
  const [selectedProject, setSelectedProject] = useState("INBOX");
  const user = supabaseClient.auth.user();
  const [play] = useSound("/sounds/woosh.mp3", {
    volume: 0.2,
  });

  const checkIfSound = () => {
    if (soundEffects) {
      play();
    }
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

  const getProjectName = async (projectId: number) => {
    if (user) {
      supabaseClient
        .from("projects")
        .select("name")
        .eq("user_id", user?.id)
        .eq("id", projectId)
        .then(({ data, error }) => {
          if (!error) {
            //@ts-ignore
            return data[0].name;
          }
        });
    }
  };

  // Get Tasks
  useEffect(() => {
    if (user) {
      supabaseClient
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .order("due_at", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            // @ts-ignore
            setTasks(data);
          }
        });
    }
  }, [project, user]);

  // Subscribe to Tasks
  useEffect(() => {
    console.log("running");
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
          console.log(newTasks);
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
            newTasks = newTasks.sort((a, b) => (a.due_at > b.due_at ? 1 : -1));
          }

          return newTasks;
        });
      })
      .subscribe();

    return () => {
      tasksListener.unsubscribe();
    };
  }, []);

  // Add Task
  const onSubmitTask = async (
    title: string,
    project: string,
    created_at: Date,
    updated_at: Date,
    content: any,
    due_at: Date
  ) => {
    if (!title) {
      toast.error("Task cannot be empty", {
        theme: "colored",
      });
    } else {
      const { error } = await supabaseClient.from("tasks").insert([
        {
          title,
          user_id: user?.id,
          project,
          created_at,
          updated_at,
          content,
          due_at,
        },
      ]);
      toast.success("Task Created!", {
        theme: "colored",
      });
    }
  };

  // Delete Task
  const onDeleteTask = async (id: any) => {
    const { error } = await supabaseClient.from("tasks").delete().eq("id", id);
    if (!error) {
      // @ts-ignore
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Update Task
  const onEditTask = async (
    id: any,
    title: string,
    project: any,
    due_at: string
  ) => {
    const projectId = typeof project === "number" ? project : 0;
    //@ts-ignore
    const dueDate = isNaN(Date.parse(new Date(due_at))) ? null : due_at;
    const { error } = await supabaseClient
      .from("tasks")
      .update({
        title,
        due_at: dueDate,
        project: projectId,
        updated_at: new Date(),
      })
      .eq("id", id);

    //@ts-ignore
    const taskToBeUpdated = (task) => task.id === id;
    const updatedTaskIndex = tasks.findIndex(taskToBeUpdated);
    const newTasks = [...tasks];
    //@ts-ignore
    newTasks[updatedTaskIndex].project = project;
    setTasks(newTasks);
    toast.success("Task Updated!", {
      theme: "colored",
    });
  };

  // Archive Task
  const onArchiveTask = async (id: any) => {
    const { error } = await supabaseClient
      .from("tasks")
      .update({ archived: true })
      .eq("id", id);

    if (!error) {
      // @ts-ignore
      setTasks(tasks.filter((task) => task.id !== id));
      checkIfSound();
      toast.success("Task Archived!", {
        theme: "colored",
      });
      if (!showConfetti) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
    }
  };

  const updateProjectName = async (name: any, id: any) => {
    const { error } = await supabaseClient
      .from("projects")
      .update({ name: name })
      .eq("id", id);

    if (!error) {
      // @ts-ignore
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project Updated!", {
        theme: "colored",
      });
    }
  };

  // Get Projects
  useEffect(() => {
    async function addUnassignedProject() {
      const { error } = await supabaseClient
        .from("projects")
        .insert([{ id: 0, name: "Unassigned", user_id: user?.id }]);
    }

    async function addPersonalProject() {
      const { error } = await supabaseClient
        .from("projects")
        .insert([{ id: 1, name: "Personal Tasks", user_id: user?.id }]);
    }

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
              arr.push(data[i].id);
            }
            if (!arr.includes(0)) {
              addUnassignedProject();
            }
            if (!arr.includes(1)) {
              addPersonalProject();
            }
            // @ts-ignore
            setProjects(data.filter((project) => project.id != 0));
          }
        });
    }
  }, [user]);

  // Subscription to Projects
  useEffect(() => {
    const projectsListener = supabaseClient
      .from("projects")
      .on("*", (payload) => {
        const newProject = payload.new;
        const oldProjects = payload.old;
        if (
          Object.keys(newProject).length === 0 &&
          Object.keys(oldProjects).length === 0
        ) {
          setProjects([]);
        } else if (Object.keys(newProject).length === 0) {
          return;
        }
        // @ts-ignore
        setProjects((oldProjects) => {
          const newProjects = [...oldProjects, newProject];
          newProjects.sort((a, b) => b.id - a.id);
          return newProjects;
        });
      })
      .subscribe();

    return () => {
      projectsListener.unsubscribe();
    };
  }, []);

  // Add Project
  const onSubmitProject = async (name: string) => {
    const { error } = await supabaseClient
      .from("projects")
      .insert([{ name, user_id: user?.id }]);
    toast.success("Project Added!", {
      theme: "colored",
    });
  };

  // Delete Project
  const onDeleteProject = async (id: any) => {
    // @ts-ignore
    const tasksToBeDeleted = tasks.filter((task) => task.project === id);
    for (let i = 0; i < tasksToBeDeleted.length; i++) {
      // @ts-ignore
      await onDeleteTask(tasksToBeDeleted[i].id);
    }

    const { error } = await supabaseClient
      .from("projects")
      .delete()
      .eq("id", id);
    if (!error) {
      // @ts-ignore
      setProjects(projects.filter((project) => project.id !== id));
      toast.success("Project Deleted!", {
        theme: "colored",
      });
    }
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
            tasks={tasks}
            onEditTask={onEditTask}
            onSubmitTask={onSubmitTask}
            onDeleteTask={onDeleteTask}
            onArchiveTask={onArchiveTask}
            updateProjectName={updateProjectName}
            project={project}
            setProject={setProject}
            getProjectName={getProjectName}
          />
        </>
      }
    </div>
  );
}
