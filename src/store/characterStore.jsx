import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import produce from "immer"

const characterStore = (set) => ({
  preset: "custom",
  shapeKeys: {
    stomach: 1,
    waist: 1,
    chest: 1,
    butt: 1,
    thighs: 1,
    calves: 1,
    hands: 1,
  },

  updateShapeKey(shapekey, val) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.shapeKeys[shapekey] = val
        draftState.preset = "custom"
      })
    )
  },

  setPreset(size) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.preset = size
      })
    )
  },
})

const useCharacterStore = create(devtools(characterStore))

export default useCharacterStore
