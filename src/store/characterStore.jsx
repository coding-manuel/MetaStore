import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import produce from "immer";
import { sizeChart } from "../utils/sizeChart";

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
        draftState.texture.hair = color;
      })
    );
  },

  updateMaterial(item, name) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.material[item] = name;
      })
    );
  },

  updateSkin(key) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.texture.skin = key;
        draftState.texture.face = key;
      })
    );
  },

  updateTexture(type, path) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.texture[type] = path;
      })
    );
  },

  updateShapeKey(shapekey, val) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.shapeKeys[shapekey] = val;
        draftState.preset = "custom";
      })
    );
  },

  setPreset(size) {
    set((state) =>
      produce(state, (draftState) => {
        draftState.preset = size;
        draftState.shapeKeys.stomach = sizeChart[size].stomach;
        draftState.shapeKeys.waist = sizeChart[size].waist;
        draftState.shapeKeys.chest = sizeChart[size].chest;
        draftState.shapeKeys.butt = sizeChart[size].butt;
        draftState.shapeKeys.thighs = sizeChart[size].thighs;
        draftState.shapeKeys.calves = sizeChart[size].calves;
        draftState.shapeKeys.hands = sizeChart[size].hands;
      })
    );
  },
});

const useCharacterStore = create(persist(devtools(characterStore)));

export default useCharacterStore;
