import create from 'zustand';
import { getLightTheme } from '../themes';
import produce from 'immer';

export const useThemeStore = create<any>((set) => ({
  theme: getLightTheme(),
  setTheme: async (theme: any) => {
    set({ theme });
  },
}));
