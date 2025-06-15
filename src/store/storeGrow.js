import { randomInRange, rollRarity } from "utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// No plant growing yet, initial state
const initialState = {
  id: null,
  stage: null,
  level: null,
  variant: null,
  rarity: null,
  time: null,
};

// Sprout will have no rarity (0), after reaching tree stage, it will have rarity from 1 to 4
// Id is null if it haven't move to the garden yet
// Variant will randomly selected
const newPlantState = {
  id: null,
  stage: "sprout",
  level: 1,
  rarity: 0,
  time: 0,
};

const maxSproutVariantbyLevels = [9, 8, 7, 8, 6, 9, 10, 8];
const maxTreeVariantByRarities = [16, 4, 2, 1];
const posibilityByRarities = [65, 20, 10, 5];

const useStoreGrow = create(
  persist(
    (set) => ({
      ...initialState,

      growNewPlant: () =>
        set((state) => ({ ...state, ...newPlantState, variant: randomInRange(1, maxSproutVariantbyLevels[0]) })),
      choosePlant: (payload) => set((state) => ({ ...state, ...payload })),
      resetPlant: () => set(() => initialState),
      growUp: () =>
        set((state) => {
          const { stage, level } = state;

          // Handle change sprout to tree case (add rarity, change stage & reset level)
          if (stage === "sprout" && state.level === 9) {
            const treeRarity = rollRarity(posibilityByRarities);

            return {
              ...state,
              stage: "tree",
              rarity: treeRarity,
              variant: randomInRange(1, maxTreeVariantByRarities[treeRarity - 1]),
              level: 1,
            };
          }

          // Handle grow up level case (both sprout and tree) - Only sprout change variant on level up
          return {
            ...state,
            level: level + 1,
            ...(stage === "sprout" && { variant: randomInRange(1, maxSproutVariantbyLevels[level - 1]) }),
          };
        }),
    }),
    {
      name: "grow-storage",
    }
  )
);

export default useStoreGrow;
