import create from "zustand";
export const useThemeStore = create<any>((set) => ({
  theme: {},
  setTheme: async (theme) => {
    set({ theme });
  },
}));
