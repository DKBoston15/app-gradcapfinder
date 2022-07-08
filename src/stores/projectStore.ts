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
            const newProjects = [...data, {id: 0, name: 'Personal'}]
            set({ projects: newProjects });
          }
        } else {
          const newProjects = [...data, {id: 0, name: 'Personal'}]
          set({ projects: newProjects });
        }
      }
    });

},

addProject: async (name) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('projects').insert([
    {
      name,
      user_id: user?.id,
      start_date: new Date()
    },
  ]);
  set((state) => ({
    projects: [...state.projects, { id: data[0].id, name, start_date: data[0].start_date, user_id: user.id }]
  }))
  return data[0].id;
},

  deleteProject: async (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== parseInt(id))
    }))

const handleDeletes = async () => {
  await supabase.from('literature').delete().eq('project_id', id);
  await  supabase.from('analysis_techniques').delete().eq('project_id', id);
  await  supabase.from('analytic_designs').delete().eq('project_id', id);
  await  supabase.from('samplings').delete().eq('project_id', id);
  await  supabase.from('research_paradigms').delete().eq('project_id', id);
  await supabase.from('research_questions').delete().eq('project_id', id);
  await  supabase.from('grants').delete().eq('project_id', id);
  await supabase.from('figures').delete().eq('project_id', id);
  await supabase.from('tables').delete().eq('project_id', id);
  await  supabase.from('labs').delete().eq('project_id', id);
  await   supabase.from('models').delete().eq('project_id', id);
  await supabase.from('people').delete().eq('project_id', id);
  await supabase.from('key_terms').delete().eq('project_id', id);
  await   supabase.from('journals').delete().eq('project_id', id);
 await  supabase.from('feed_entries').delete().eq('project_id', id);
}
    await handleDeletes()
   await supabase.from('projects').delete().eq('id', parseInt(id));
},

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
          project.id == id
          ? ({ ...project, objectives})
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