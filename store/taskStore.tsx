import create from "zustand";
import { supabaseClient } from "../lib/client";

const user = supabaseClient.auth.user();

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
    console.log("updating store tasks");
    getTasks();
  })
  .subscribe();

export const useTaskStore = create<any>((set) => ({
  tasks: [],
  projects: [],
  getTasks: async () => {
    supabaseClient
      .from("tasks")
      .select("*")
      .eq("user_id", user?.id)
      .order("due_at", { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ tasks: data });
        }
      });
  },
  addTask: async (
    title: string,
    project: string,
    created_at: Date,
    updated_at: Date,
    content: any,
    due_at: Date
  ) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const { error } = await supabaseClient.from("tasks").insert([
      {
        title,
        user_id: user?.id,
        project,
        created_at,
        updated_at,
        content,
        due_at,
        timezone,
      },
    ]);
  },
  deleteTask: async (id: any) => {
    const { error } = await supabaseClient.from("tasks").delete().eq("id", id);
  },
  editTask: async (id: any, title: string, project: any, due_at: string) => {
    console.log("task being edited");
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
  },
  archiveTask: async (id: any) => {
    const { error } = await supabaseClient
      .from("tasks")
      .update({ archived: true })
      .eq("id", id);
  },
  completeTask: async (id: any) => {
    const { error } = await supabaseClient
      .from("tasks")
      .update({ completed: true })
      .eq("id", id);
  },
  getProjects: async () => {
    const { data, error, status } = await supabaseClient
      .from("projects")
      .select(`*`);
    set({ projects: data });
  },
  addProject: async (name: string) => {
    const { error } = await supabaseClient
      .from("projects")
      .insert([{ name, user_id: user?.id }]);
  },
  deleteProject: async (id: any, tasks: any) => {
    // @ts-ignore
    const tasksToBeDeleted = tasks.filter((task) => task.project === id);
    for (let i = 0; i < tasksToBeDeleted.length; i++) {
      // @ts-ignore
      await supabaseClient
        .from("tasks")
        .delete()
        .eq("id", tasksToBeDeleted[i].id);
    }

    const { error } = await supabaseClient
      .from("projects")
      .delete()
      .eq("id", id);
  },
  updateProjectNameStore: async (name: string, id: any) => {
    const { error } = await supabaseClient
      .from("projects")
      .update({ name: name })
      .eq("id", id);
  },
  getProjectName: async (id: any) => {
    if (id != 0) {
      const data = supabaseClient
        .from("projects")
        .select("name")
        .eq("user_id", user?.id)
        .eq("id", id)
        .then(({ data, error }) => {
          console.log("data", data);
          if (!error) {
            //@ts-ignore
            return data[0].name;
          }
        });
      return data;
    }
  },
  addUnassignedProject: async () => {
    const { error } = await supabaseClient
      .from("projects")
      .insert([{ standard_id: 0, name: "Unassigned", user_id: user?.id }]);
  },
  addPersonalProject: async () => {
    const { error } = await supabaseClient
      .from("projects")
      .insert([{ standard_id: 1, name: "Personal Tasks", user_id: user?.id }]);
  },
  addDissertationProject: async () => {
    const { error } = await supabaseClient
      .from("projects")
      .insert([
        { standard_id: 2, name: "Dissertation Tasks", user_id: user?.id },
      ]);
  },
}));
