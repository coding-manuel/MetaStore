import create from "zustand";
import { supabase } from "../utils/supabaseClient";

const mainStore = (set) => ({
  menuOpen: false,
  isDesktop: true,
  user: "null",

  useAuth() {
    const { data, error } = supabase.auth.getSession();
    set(() => ({
      user: data,
    }));
    return data;
  },

  setSession(session) {
    set(() => ({
      user: session,
    }));
  },

  onResize: () => {
    document
      .querySelector(":root")
      .style.setProperty("--vh", window.innerHeight / 100 + "px");

    set(() => ({
      isDesktop: window.innerWidth > 700,
    }));
  },

  handleMenuToggle: () => {
    set((state) => ({
      menuOpen: !state.menuOpen,
    }));
  },
});

const useMainStore = create(mainStore);

export default useMainStore;
