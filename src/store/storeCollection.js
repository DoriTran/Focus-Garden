import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  coin: 0,
  gem: 0,
  // Each inside element is a row, each row has: { id: PlantId, spot: SpotType }, { no plant id } (empty), null (not buy yet)
  garden: [
    [{ spot: "grass" }, { spot: "grass" }, { spot: "grass" }],
    [{ spot: "grass" }, { spot: "grass" }, { spot: "grass" }],
    [{ spot: "grass" }, { spot: "grass" }, { spot: "grass" }],
  ],
  // Spot type storage:
  spots: { grass: { own: 9, used: 9 } },
};

const useStoreCollection = create(
  persist(
    (set) => ({
      ...initialState,

      // Coin & gem management
      adjustCoin: (amount) => set((state) => ({ ...state, coin: state.coin + amount })),
      adjustGem: (amount) => set((state) => ({ ...state, gem: state.gem + amount })),

      // Garden spot management
      buyNewGardenSpot: (row, col) =>
        set((state) => {
          const garden = state.garden.map((r) => [...r]);

          // Check if buying spot in new row
          if (row === garden.length) {
            const canAddNewRow = garden[garden.length - 1].every((cell) => cell !== null);
            if (canAddNewRow) garden.push(Array(garden[0].length).fill(null));
          }

          // Check if buying spot in new column
          if (col === garden[0].length) {
            const canAddNewCol = garden.every((r) => r[col - 1] !== null);
            if (canAddNewCol) garden.forEach((r) => r.push(null));
          }

          // After checking, recheck out of bound & set the spot to "empty"
          if (!(row >= garden.length || col >= garden[0].length)) garden[row][col] = {};
          return { ...state, garden };
        }),

      updateGardenSpot: (row, col, payload) =>
        set((state) => {
          const garden = state.garden.map((r) => [...r]);

          // Check if payload include spot type change
          const spots = { ...state.spots };
          if (payload.spot) {
            if (garden[row][col].spot) spots[garden[row][col].spot].used -= 1;
            spots[payload.spot].used += 1;
          }

          // Update garden spot with other payload properties
          if (row < garden.length && col < garden[0].length) {
            garden[row][col] = { ...garden[row][col], ...payload };
          }

          return { ...state, garden, spots };
        }),

      // Spot type management
      buySpotType: (spotType) =>
        set((state) => {
          const spots = { ...state.spots };
          if (!spots[spotType]) spots[spotType] = { own: 0, used: 0 };
          spots[spotType].own += 1;
          return { ...state, spots };
        }),
    }),
    {
      name: "collection-storage",
    }
  )
);

export default useStoreCollection;
