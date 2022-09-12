import { rootNavigate } from '@app/CustomRouter';
import { supabase } from '@app/supabase';
import create from 'zustand';

export const useGeneralStore = create<any>((set) => ({
  visible: false,
  onboarding: false,
  navVisible: true,
  activeIndex: 0,
  displayNavChangePrompt: false,
  navChangePath: '',
  getAll: false,
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
  setDisplayNavChangePrompt: async (bool: boolean) => {
    set({ displayNavChangePrompt: bool });
  },
  setNavChangePath: async (path: string) => {
    set({ navChangePath: path });
  },
  setGetAll: async () => {
    const getAll = useGeneralStore.getState().getAll;
    set({ getAll: !getAll });
  },
  handleNavChange: (path) => {
    const data = sessionStorage.getItem('noteContentPending');
    if (data === true || data === 'true') {
      set({ navChangePath: path });
      set({ displayNavChangePrompt: true });
    } else {
      rootNavigate(path);
    }
  },
}));
