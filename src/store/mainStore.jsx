import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { supabase } from "../utils/supabaseClient";

const mainStore = (set) => ({
  menuOpen: false,
  isDesktop: true,
  user: null,
  role: null,

  /* AUTH FUNCTION */
  useAuth() {
    const { data, error } = supabase.auth.getSession();
    set(() => ({
      user: data,
    }));
    return data;
  },

  async handleLogOut() {
    let { error } = await supabase.auth.signOut();
    set(() => ({
      user: null,
      role: null,
    }));
  },

  async setRole(userId) {
    const role = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId);

    set(() => ({
      role: role.data[0].role,
    }));
  },

  setSession(session) {
    set(() => ({
      user: session,
    }));
  },

  /* UI FUNCTION */
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
const useMainStore = create(persist(devtools(mainStore)));

export default useMainStore;
