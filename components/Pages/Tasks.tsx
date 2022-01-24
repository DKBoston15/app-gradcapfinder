/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Content from "../TaskComponents/Content";
import { supabaseClient } from "../../lib/client";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("INBOX");
  const user = supabaseClient.auth.user();

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
            setTasks(data);
          }
        });
    }
  }, [user]);

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
          const newTasks = [...oldTasks, newTask];
          newTasks.sort((a, b) => b.id - a.id);
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
    const { error } = await supabaseClient.from("tasks").insert([
      {
        title,
        // @ts-ignore
        user_id: user.id,
        project,
        created_at,
        updated_at,
        content,
        due_at,
      },
    ]);
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
  const onEditDeleteTask = async (id: any, title: string, due_at: Date) => {
    const { error } = await supabaseClient
      .from("tasks")
      .update({ title, due_at, project })
      .eq("id", id);

    if (!error) {
      // @ts-ignore
      setTasks(tasks.filter((task) => task.id !== id));
    }
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
    }
  };

  // Get Projects
  useEffect(() => {
    async function addUnassignedProject() {
      const { error } = await supabaseClient
        .from("projects")
        // @ts-ignore
        .insert([{ id: 0, name: "Unassigned", user_id: user.id }]);
      // @ts-ignore
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
            console.log(arr);
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
      // @ts-ignore
      .insert([{ name, user_id: user.id }]);
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
    }
  };

  // Update Project

  return (
    <div className="flex flex-col w-full min-h-screen">
      {
        <Content
          projects={projects}
          onSubmitProject={onSubmitProject}
          onDeleteProject={onDeleteProject}
          setSelectedProject={setSelectedProject}
          selectedProject={selectedProject}
          tasks={tasks}
          onSubmitTask={onSubmitTask}
          onDeleteTask={onDeleteTask}
          onArchiveTask={onArchiveTask}
          updateProjectName={updateProjectName}
        />
      }
    </div>
  );
}
