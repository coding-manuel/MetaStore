import create from 'zustand'
import {devtools, persist} from 'zustand/middleware'

const mainStore = (set) => ({
    menuOpen: false,
    isDesktop: true,

    onResize: () => {
        set(() => ({
            isDesktop: window.innerWidth > 820,
        }))
    },

    handleMenuToggle: () => {
        console.log("dgvjh")
        set((state) => ({
            menuOpen: !state.menuOpen
        }))
    }
})

const useMainStore = create(
    devtools(
        persist(mainStore, {
            name: "main",
        })
    )
)

export default useMainStore;
