import create from "zustand";
interface State {
  sessionKey: string;
  setSessionKey: (value: string) => void;
  deleteSessionKey: () => void;
}
export const useStore = create<State>((set, get) => ({
  sessionKey: "",
  setSessionKey: (value: string) =>
    set((state) => ({
      ...state,
      sessionKey: value,
    })),
  deleteSessionKey: () =>
    set((state) => ({
      ...state,
      sessionKey: "",
    })),
}));
