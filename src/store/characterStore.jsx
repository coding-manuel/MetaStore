import create from "zustand"
import { persist, devtools } from "zustand/middleware"
import produce from "immer"
import { sizeChart } from "../utils/sizeChart"
import { normaliseValue } from "../utils/utilFunctions"

const characterStore = (set, get) => ({
  preset: "default",
  shapeKeys: {
    stomach: 0.35,
    waist: 0.32,
    chest: 0.29,
    butt: 0.43,
    thighs: 0.39,
    calves: 0.41,
    hands: 0.35,
  },

  shapeKeysAdd: {
    stomach: 0,
    butt: 0,
    thighs: 0,
    hands: 0,
  },

  measurement: null,

  material: {
    hairMesh: "Hair-02",
    hairColor: "Hair-Black-01",
    glasses: "none",
    shoe: "Shoes-Black-01",
  },

  texture: {
    skin: "pale",
    face: "pale",
    hair: "#111111",
    top: "/assets/orange.png",
  },

  updateHairColor(color) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.texture.hair = color
      })
    )
  },

  updateMaterial(item, name) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.material[item] = name
      })
    )
  },

  updateSkin(key) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.texture.skin = key
        draftState.texture.face = key
      })
    )
  },

  updateTexture(type, path) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.texture[type] = path
      })
    )
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
        draftState.shapeKeys.stomach = sizeChart[size].stomach
        draftState.shapeKeys.waist = sizeChart[size].waist
        draftState.shapeKeys.chest = sizeChart[size].chest
        draftState.shapeKeys.butt = sizeChart[size].butt
        draftState.shapeKeys.thighs = sizeChart[size].thighs
        draftState.shapeKeys.calves = sizeChart[size].calves
        draftState.shapeKeys.hands = sizeChart[size].hands
      })
    )
  },

  setMeasurement(preset, measurement) {
    const shapeKeys = {
      stomach: normaliseValue(measurement.weight, 40, 120),
      waist: normaliseValue(measurement.waist, 25, 50),
      chest: normaliseValue(measurement.chest, 38, 50),
      butt: 0.43,
      thighs: normaliseValue(measurement.thighs, 20, 30),
      calves: 0.41,
      hands: 0.35,
    }

    get().setShapeKeys(shapeKeys)

    set((state) =>
      produce(state, (draftState) => {
        draftState.preset = preset
        draftState.measurement = measurement
      })
    )

    return shapeKeys
  },

  updateUserMeasurements(data) {
    const size = JSON.parse(data.measurements)

    if (!size) {
      set((state) =>
        produce(state, (draftState) => {
          draftState.preset = "default"
        })
      )
    } else {
      const shapeKeys = {
        stomach: normaliseValue(size.weight, 40, 120),
        waist: normaliseValue(size.waist, 25, 50),
        chest: normaliseValue(size.chest, 38, 50),
        butt: 0.43,
        thighs: normaliseValue(size.thighs, 20, 30),
        calves: 0.41,
        hands: 0.35,
      }

      get().setShapeKeys(shapeKeys)

      set((state) =>
        produce(state, (draftState) => {
          draftState.preset = "custom"
          draftState.measurement = size
        })
      )
    }
  },

  setShapeKeys(size) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.preset = "custom"
        draftState.shapeKeys.stomach = size.stomach
        draftState.shapeKeys.waist = size.waist
        draftState.shapeKeys.chest = size.chest
        draftState.shapeKeys.butt = size.butt
        draftState.shapeKeys.thighs = size.thighs
        draftState.shapeKeys.calves = size.calves
        draftState.shapeKeys.hands = size.hands
      })
    )
  },
})

const useCharacterStore = create(devtools(characterStore))

export default useCharacterStore
