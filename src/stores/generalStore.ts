import create from 'zustand';
import produce from 'immer';

export const useGeneralStore = create<any>((set) => ({
  visible: false,
  onboarding: false,
  setVisible: async (visibility: any) => {
    set({ visible: visibility });
  },
  setOnboarding: async (onboarding: any) => {
  set({ onboarding });
},
}));
