import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  spots: {},
};

const useStoreGarden = create(
  persist(
    (set) => ({
      ...initialState,

      addPlant: (plant) =>
        set((state) => {
          const id = plant.id || uuidv4();
          const newPlant = { ...plant, id };

          return {
            ...state,
            spots: {
              ...state.spots,
              [id]: newPlant,
            },
          };
        }),

      updatePlant: (id, payload) =>
        set((state) => ({
          ...state,
          spots: {
            ...state.spots,
            [id]: {
              ...state.spots[id],
              ...payload,
            },
          },
        })),

      removePlant: (id) =>
        set((state) => {
          const newSpots = { ...state.spots };
          delete newSpots[id];
          return { ...state, spots: newSpots };
        }),
    }),
    {
      name: "garden-storage",
    }
  )
);

export default useStoreGarden;
