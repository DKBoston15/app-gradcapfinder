import { rootNavigate } from '@app/CustomRouter';
import create from 'zustand';

export const useGeneralStore = create<any>((set) => ({
  visible: false,
  onboarding: false,
  navVisible: true,
  activeIndex: 0,
  displayNavChangePrompt: false,
  navChangePath: '',
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
  handleNavChange: (path) => {
    const data = sessionStorage.getItem('noteContentPending');
    if (data === true || data === 'true') {
      set({ navChangePath: path });
      set({ displayNavChangePrompt: true });
    } else {
      rootNavigate(path);
    }
  }
}));
