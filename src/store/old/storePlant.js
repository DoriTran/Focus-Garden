import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  plants: {},
};

const useStorePlant = create(
  persist(
    (set) => ({
      ...initialState,

      // Plant actions
      addPlant: (plant) =>
        set((state) => {
          const id = plant.id || uuidv4();
          const newPlant = { ...plant, id };

          return {
            ...state,
            plants: {
              ...state.plants,
              [id]: newPlant,
            },
          };
        }),

      updatePlant: (id, payload) =>
        set((state) => ({
          ...state,
          plants: {
            ...state.plants,
            [id]: {
              ...state.plants[id],
              ...payload,
            },
          },
        })),

      removePlant: (id) =>
        set((state) => {
          const newplants = { ...state.plants };
          delete newplants[id];
          return { ...state, plants: newplants };
        }),
    }),
    {
      name: "plant-storage",
    }
  )
);

export default useStorePlant;
