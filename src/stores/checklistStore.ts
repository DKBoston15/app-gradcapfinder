import create from 'zustand';
import { persist } from 'zustand/middleware';

const useChecklistStore = create(
    persist((set) => ({

    checklists: [],

    addChecklist: async (newChecklist) => {
        set((state) => ({
            checklists: [...state.checklists, newChecklist]
        }))},

    removeChecklist: async (id) => {
        set((state) => ({
            checklists: state.checklists.filter((checklist) => checklist.id !== id)
        }))},

    patchChecklist: async (updatedChecklist) => {
        const checklists = useChecklistStore.getState().checklists;
        const data = checklists.map((checklist) =>
        checklist.id === updatedChecklist.id
        ? ({ ...updatedChecklist, checklist: updatedChecklist.checklist})
        : checklist);

        set((state) => ({
            checklists: [ ...data]
        }))},

    }), {name: 'checklists', getStorage: () => sessionStorage})
);

export default useChecklistStore;