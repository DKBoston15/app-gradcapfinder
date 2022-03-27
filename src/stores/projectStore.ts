import { Label } from "@supabase/ui/dist/cjs/components/Dropdown/Dropdown";
import create from "zustand";
import { supabase } from "../supabase";

export const useProjectStore = create<any>((set) => ({
  projects: [],
  dropdownProjects: [],
  selectedProject: undefined,
  selectedProjectName: undefined,
  setSelectedProject: (id: string, name: string) => {
    set({ selectedProject: parseInt(id) });
    set({ selectedProjectName: name });
  },
  getProjects: async () => {
    const { data, error, status } = await supabase.from("projects").select(`*`);
    set({ projects: data });

    const dropdownDataTemp: any[] = [];
    data?.forEach((project) => {
      dropdownDataTemp.push({ label: project.name, value: project.id });
    });
    set({ dropdownProjects: dropdownDataTemp });
    return data;
  },
  addProject: async (name: string, description: string) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from("projects")
      .insert([{ name, user_id: user?.id, description }]);
    set({ selectedProject: data[0].id });
  },
  deleteProject: async (id: any) => {
    // @ts-ignore
    // const tasksToBeDeleted = tasks.filter((task) => task.project === id);
    // for (let i = 0; i < tasksToBeDeleted.length; i++) {
    //   // @ts-ignore
    //   await supabase.from("tasks").delete().eq("id", tasksToBeDeleted[i].id);
    // }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    const projects = useProjectStore.getState().projects;
    set({ selectedProject: projects[0].id });
  },
  updateProject: async (id: number, name: string, description: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ name, description })
      .eq("id", id);
    const getProjects = useProjectStore.getState().getProjects;
    await getProjects();
  },
  getProjectName: async (id: any) => {
    const user = supabase.auth.user();
    if (id != 0) {
      const data = supabase
        .from("projects")
        .select("name")
        .eq("user_id", user?.id)
        .eq("id", id)
        .then(({ data, error }) => {
          if (!error) {
            //@ts-ignore
            return data[0].name;
          }
        });
      return data;
    }
  },
  addUnassignedProject: async () => {
    const user = supabase.auth.user();
    const { error } = await supabase
      .from("projects")
      .insert([{ standard_id: 0, name: "Unassigned", user_id: user?.id }]);
  },
  addPersonalProject: async () => {
    const user = supabase.auth.user();
    const { error } = await supabase
      .from("projects")
      .insert([{ standard_id: 1, name: "Personal Tasks", user_id: user?.id }]);
  },
  addDissertationProject: async () => {
    const user = supabase.auth.user();
    const { error } = await supabase
      .from("projects")
      .insert([
        { standard_id: 2, name: "Dissertation Tasks", user_id: user?.id },
      ]);
  },
}));
