import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import produce from "immer"

const characterStore = (set) => ({
  shapeKeys: {
    top: {
      stomach: 1,
      waist: 1,
      chest: 1,
      butt: 1,
    },
    bottom: {
      stomach: 1,
      waist: 1,
      butt: 1,
      thighs: 1,
    },
  },

  updateShapeKey(item, shapekey, val) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.shapeKeys[item][shapekey] = val
      })
    )
  },
})

const useCharacterStore = create(persist(devtools(characterStore)))

export default useCharacterStore
