import create from 'zustand';
import produce from 'immer';

export const useGeneralStore = create<any>((set) => ({
  visible: false,
  onboarding: false,
  navVisible: true,
  activeIndex: 0,
  setVisible: async (visibility: any) => {
    set({ visible: visibility });
  },
  setOnboarding: async (onboarding: any) => {
  set({ onboarding });
  },
  setNavVisible: async (visibility: any) => {
    set({ navVisible: visibility });
  },
  setActiveIndex: async (index: any) => {
    set({ activeIndex: index });
  },
}));
