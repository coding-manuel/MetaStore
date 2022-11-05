import create from "zustand";

const mainStore = (set) => ({
  menuOpen: false,
  isDesktop: true,
  user: "null",

  setSession(session) {
    set(() => ({
      user: session,
    }));
  },

  onResize: () => {
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
