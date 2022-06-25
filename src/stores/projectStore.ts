import create from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../supabase';

export const useProjectStore = create(
  persist((set) => ({

  projects: [],

  getProjects: async () => {
    const user = supabase.auth.user();
    const projects = JSON.parse(sessionStorage.getItem('projects'));
    await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('name', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (projects) {
          if (projects.state.projects.length != data.length) {
            sessionStorage.removeItem('projects');
            set({ projects: data });
          }
        } else {
          set({ projects: data });
        }
      }
    });

},

addProject: async (name) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('projects').insert([
    {
      name,
      start_date: new Date()
    },
  ]);
  set((state) => ({
    projects: [...state.projects, { id: data[0].id, name, start_date: data[0].start_date }]
  }))},

  deleteProject: async (id) => {
    await supabase.from('projects').delete().eq('id', id);
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id)
    }))},

  archiveProject: async (id) => {
    const { data } = await supabase
    .from('projects')
    .update({
      archived_at: new Date(),
    })
    .eq('id', id);
    set((state) => ({
      projects: state.projects.map((project) =>
      project.id === id
          ? ({ ...project, completed_at: data[0].archived_at })
          : project
      ),
    }))},  

    completeProject: async (id) => {
      const { data } = await supabase
      .from('projects')
      .update({
        completed_at: new Date(),
      })
      .eq('id', id);
      set((state) => ({
        projects: state.projects.map((project) =>
        project.id === id
            ? ({ ...project, completed_at: data[0].completed_at })
            : project
        ),
      }))},  

      updateObjective: async (id, objectives) => {
       await supabase
        .from('projects')
        .update({
          objectives
        })
        .eq('id', id);
        set((state) => ({
          projects: state.projects.map((project) =>
          project.id === id
              ? ({ ...project, objectives })
              : project
          ),
        }))},  

        
        updateActivity: async (id, activities) => {
         await supabase
          .from('projects')
          .update({
            activities,
          })
          .eq('id', id);
          set((state) => ({
            projects: state.projects.map((project) =>
            project.id === id
                ? ({ ...project, activities })
                : project
            ),
          }))},  

          
          updateProduct: async (id, products) => {
            await supabase
            .from('projects')
            .update({
              products
            })
            .eq('id', id);
            set((state) => ({
              projects: state.projects.map((project) =>
              project.id === id
                  ? ({ ...project, products })
                  : project
              ),
            }))},  

            updateProjectDate: async (id, start_date) => {
              await supabase
              .from('projects')
              .update({
                start_date
              })
              .eq('id', id);
              set((state) => ({
                projects: state.projects.map((project) =>
                project.id === id
                    ? ({ ...project, start_date })
                    : project
                ),
              }))},  
        

  }), {name: 'projects', getStorage: () => sessionStorage})
);