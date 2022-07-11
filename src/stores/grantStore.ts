import create from 'zustand';
import { supabase } from '../supabase/index';
import { persist } from 'zustand/middleware';

export const useGrantStore = create(
  persist((set) => ({

    grants: [],
    filteredGrants: [],

    getFilteredGrants: async (id) => {
      const grants = useGrantStore.getState().grants;
      const newGrants = grants.filter((grant) => grant.project_id == parseInt(id));
      set({ filteredGrants: newGrants });
    },

    getGrants: async () => {
    const user = supabase.auth.user();
    const grants = JSON.parse(sessionStorage.getItem('grants'));
    await supabase
    .from('grants')
    .select('*')
    .eq('user_id', user?.id)
    .order('title', { ascending: true })
    .then(({ data, error }) => {
      if (!error) {
        if (grants) {
          if (grants.state.grants.length != data.length) {
            sessionStorage.removeItem('grants');
            set({ grants: data });
          }
        } else {
          set({ grants: data });
        }
      }
    });

},

addGrant: async (    
  title: string,
  link: string,
  granting_organization: string,
  number: string,
  fund_date: string,
  amount: string,
  reporting_date_1: string,
  reporting_date_2: string,
  reporting_date_3: string,
  reporting_date_4: string,
  selectedProject: number,
) => {
  const user = supabase.auth.user();
  const { data } = await supabase.from('grants').insert([
    {
      link,
      title,
      granting_organization,
      number,
      fund_date,
      amount,
      reporting_date_1,
      reporting_date_2,
      reporting_date_3,
      reporting_date_4,
      user_id: user.id,
      project_id: selectedProject,
    },
  ]);
  set((state) => ({
    grants: [...state.grants, { id: data[0].id, project_id: selectedProject, link, title, granting_organization, number, fund_date, amount, reporting_date_1, reporting_date_2, reporting_date_3, reporting_date_4 }]
  }))},

  deleteGrant: async (id) => {
      await supabase.from('grants').delete().eq('id', id);
      set((state) => ({
        grants: state.grants.filter((grant) => grant.id !== id)
      }))},

  patchGrant: async (
    id: number,
    title: string,
    link: string,
    granting_organization: string,
    number: string,
    fund_date: string,
    amount: string,
    reporting_date_1: string,
    reporting_date_2: string,
    reporting_date_3: string,
    reporting_date_4: string,
  ) => {
    await supabase
    .from('grants')
    .update({
      title,
      link,
      granting_organization,
      number,
      fund_date,
      amount,
      reporting_date_1,
      reporting_date_2,
      reporting_date_3,
      reporting_date_4,
    })
    .eq('id', id);
    set((state) => ({
      grants: state.grants.map((grant) =>
      grant.id === id
      ? ({ ...grant,         
        title,
        link,
        granting_organization,
        number,
        fund_date,
        amount,
        reporting_date_1,
        reporting_date_2,
        reporting_date_3,
        reporting_date_4})
      : grant
    ),
    }))},

  }), {name: 'grants', getStorage: () => sessionStorage})
);