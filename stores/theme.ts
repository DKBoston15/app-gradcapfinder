import create from 'zustand';
import { getLightTheme } from '../themes';

export const useThemeStore = create<any>((set) => ({
  theme: getLightTheme(),
  setTheme: async (theme: any) => {
    set({ theme });
  },
}));
