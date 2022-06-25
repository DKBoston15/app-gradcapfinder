// /* eslint-disable import/prefer-default-export */
// import { useEntryFeedStore } from '@app/stores/entryFeedStore';
// import create from 'zustand';
// import { supabase } from '../supabase';
// import { useLiteratureStore } from './literatureStore';
// import { useProjectStore } from './projectStore';
// import produce from 'immer';

// export const useProjectStore = create<any>((set) => ({
//   projects: [],
//   dropdownProjects: [],
//   selectedProject: undefined,
//   selectedProjectName: undefined,
//   selectedProjectInfo: undefined,
//   setSelectedProject: (id: string, name: string) => {
//     const getProjectInfo = useProjectStore.getState().getProjectInfo;
//     set({ selectedProject: parseInt(id) });
//     set({ selectedProjectName: name });
//     getProjectInfo(id);
//   },
//   getProjects: async () => {
//     const data = await supabase.from('projects')
//       .select('*').then(({data, error}) => {
//         const newData = data.filter(
//           (project) => project.archived_at === null,
//         );
//         const filteredData = newData.filter(
//           (project) => project.completed_at === null,
//         );
//         return filteredData;
//       });

//     set({ projects: data });

//     const dropdownDataTemp: any[] = [];
//     data?.forEach((project) => {
//       dropdownDataTemp.push({ label: project.name, value: project.id });
//     });
//     set({ dropdownProjects: dropdownDataTemp });
//     return data;
//   },
//   getProjectInfo: async (selectedProject: any) => {
//     const user = supabase.auth.user();
//     const data = await supabase
//       .from('projects')
//       .select('*')
//       .eq('user_id', user?.id)
//       .eq('id', selectedProject)
//       .then(({ data, error }) => {
//         if (!error) {
//           // @ts-ignore
//           set({ selectedProjectInfo: data });
//           return data;
//         }
//       });
//     set({ selectedProjectInfo: data[0] });
//     return data[0];
//   },
//   addProject: async (name: string) => {
//     const user = supabase.auth.user();
//     const { data, error } = await supabase
//       .from('projects')
//       .insert([{ name, user_id: user?.id }]);

//       const dropdownDataTemp: any[] = [];
//       data?.forEach((project) => {
//         dropdownDataTemp.push({ label: project.name, value: project.id });
//       });
//       set({ dropdownProjects: dropdownDataTemp });

//     const setSelectedProject = useProjectStore.getState().setSelectedProject;
//     await setSelectedProject(data[0].id, data[0].name)
//   },
//   deleteProject: async (id: any) => {
//     // Delete all Literature References
//     const literature = useLiteratureStore.getState().literature;
//     const literatureTBD = literature.filter((literature: any) => literature.project_id == id);
//     for (let i = 0; i < literatureTBD.length; i++) {
//       // Delete all Entries for literature
//       const entries = useEntryFeedStore.getState().entries;
//       const entriesTBD = entries.filter((entry: any) => entry.connected_id == literatureTBD[i].id);
//       for (let i = 0; i < entriesTBD.length; i++) {
//         await supabase.from('feed_entries').delete().eq('id', entriesTBD[i].id);
//       }
//       await supabase.from('literature').delete().eq('id', literatureTBD[i].id);
//     }

//     // Delete Project
//     await supabase.from('projects').delete().eq('id', id);

//     const projects = useProjectStore.getState().projects;
//     const otherProjects = projects.filter(
//       (project:any) => project.id !== id,
//     );
//     set({ projects: otherProjects });
//     const dropdownDataTemp: any[] = [];
//     otherProjects?.forEach((project) => {
//       dropdownDataTemp.push({ label: project.name, value: project.id });
//     });
//     set({ dropdownProjects: dropdownDataTemp });
//     set({ selectedProject: otherProjects[0].id });
//   },
//   updateProject: async (id: number, name: string) => {
//     await supabase.from('projects').update({ name }).eq('id', id);
//     const getProjects = useProjectStore.getState().getProjects;
//     await getProjects();
//   },
//   updateObjective: async (id: number, objectives: string) => {
//     await supabase.from('projects').update({ objectives }).eq('id', id);
//   },
//   updateActivity: async (id: number, activities: string) => {
//     await supabase.from('projects').update({ activities }).eq('id', id);
//   },
//   updateProduct: async (id: number, products: string) => {
//     await supabase.from('projects').update({ products }).eq('id', id);
//   }, 
//   getProjectName: async (id: any) => {
//     const user = supabase.auth.user();
//     if (id && id != 0) {
//       const data = supabase
//         .from('projects')
//         .select('name')
//         .eq('user_id', user?.id)
//         .eq('id', id)
//         .then(({ data, error }) => {
//           if (!error) {
//             //  @ts-ignore
//             return data[0].name;
//           }
//         });
//       return data;
//     }
//   },
//   updateProjectDates: async (id, start_date) => {
//     await supabase.from('projects').update({ start_date }).eq('id', id);
//   },
//   completeProject: async (id) => {
//     const projects = useProjectStore.getState().projects;
//     const completed_at = new Date();
//     await supabase.from('projects').update({ completed_at }).eq('id', id);
//     const otherProjects = projects.filter(
//       (project:any) => project.id !== id,
//     );
//     set({ projects: otherProjects });
//     const dropdownDataTemp: any[] = [];
//     otherProjects?.forEach((project) => {
//       dropdownDataTemp.push({ label: project.name, value: project.id });
//     });
//     set({ dropdownProjects: dropdownDataTemp });
//   },
//   archiveProject: async (id) => {
//     const projects = useProjectStore.getState().projects;
//     const archived_at = new Date();
//     await supabase.from('projects').update({ archived_at }).eq('id', id);
//     const otherProjects = projects.filter(
//       (project:any) => project.id !== id,
//     );
//     set({ projects: otherProjects });
//     const dropdownDataTemp: any[] = [];
//     otherProjects?.forEach((project) => {
//       dropdownDataTemp.push({ label: project.name, value: project.id });
//     });
//     set({ dropdownProjects: dropdownDataTemp });
//   },
// }));


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