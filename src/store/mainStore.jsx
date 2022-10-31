import create from "zustand"

const mainStore = (set) => ({
  menuOpen: false,
  isDesktop: true,

  onResize: () => {
    set(() => ({
      isDesktop: window.innerWidth > 1030,
    }))
  },

  handleMenuToggle: () => {
    set((state) => ({
      menuOpen: !state.menuOpen,
    }))
  },
})

const useMainStore = create(mainStore)

export default useMainStore
