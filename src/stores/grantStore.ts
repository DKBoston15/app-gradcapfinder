import create from 'zustand';
import { supabase } from '../supabase/index';
import produce from 'immer';

export const useGrantStore = create<any>((set) => ({
  grants: [],
  getGrants: async (selectedProject: any) => {
    const user = supabase.auth.user();
    const data = await supabase
      .from('grants')
      .select('*')
      .eq('user_id', user?.id)
      .eq('project_id', selectedProject)
      .order('title', { ascending: true })
      .then(({ data, error }) => {
        if (!error) {
          // @ts-ignore
          set({ grants: data });
          return data;
        }
      });
    return data;
  },
  addGrant: async (
    userId: string,
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
    const { data, error } = await supabase.from('grants').insert([
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
        user_id: userId,
        project_id: selectedProject,
      },
    ]);
    set(
      produce((draft) => {
        draft.grants.push(data[0]);
      }),
    );
  },
  deleteGrant: async (id: number) => {
    const { error } = await supabase.from('grants').delete().eq('id', id);
    set(
      produce((draft) => {
        const index = draft.grants.findIndex((el) => el.id === id);
        draft.grants.splice(index, 1);
      }),
    );
  },
  editGrant: async (
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
    const { data, error } = await supabase
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

    set(
      produce((draft) => {
        const grant = draft.grants.find((el) => el.id === data[0].id);
        grant.title = data[0].title;
        grant.link = data[0].link;
        grant.granting_organization = data[0].granting_organization;
        grant.number = data[0].number;
        grant.fund_date = data[0].fund_date;
        grant.amount = data[0].amount;
        grant.reporting_date_1 = data[0].reporting_date_1;
        grant.reporting_date_2 = data[0].reporting_date_2;
        grant.reporting_date_3 = data[0].reporting_date_3;
        grant.reporting_date_4 = data[0].reporting_date_4;
      }),
    );
  },
}));
