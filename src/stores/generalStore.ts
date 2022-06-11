import create from 'zustand';
import produce from 'immer';

export const useGeneralStore = create<any>((set) => ({
  visible: false,
  setVisible: async (visibility: any) => {
      console.log(visibility)
    set({ visible: visibility });
  },
}));
