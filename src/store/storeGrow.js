import { calculateSellReward, getCurrentUnixTime, probability, randomInRange, rollRarity } from "utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useStoreShop from "./storeShop";

// No plant growing yet, initial state
const initialState = {
  id: null,
  stage: null,
  level: null,
  variant: null,
  rarity: null,
  time: null,
  update: null,
  favorite: false,
  isFertilized: false,
  isLuckyClover: false,
  preGraft: false,
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
  favorite: false,
};

export const maxSproutVariantbyLevels = [9, 8, 7, 8, 6, 9, 10, 8];
export const maxTreeVariantByRarities = [20, 15, 14, 15, 5];
const posibilityByRarities = [60, 25, 10, 4, 1];
const posibilityByRaritiesWithClover = [10, 50, 25, 10, 5];
const growUpChance = 0.125;
const growUpChanceFertilized = 0.25;

const useStoreGrow = create(
  persist(
    (set) => ({
      ...initialState,
      isFertilized: false,
      isLuckyClover: false,

      // Plant actions
      growNewPlant: () =>
        set((state) => ({
          ...state,
          ...newPlantState,
          id: getCurrentUnixTime(),
          variant: randomInRange(1, maxSproutVariantbyLevels[0]),
        })),
      choosePlant: (plant) => set((state) => ({ ...state, ...plant })),
      toggleFavorite: () => set((state) => ({ ...state, favorite: !state.favorite })),
      resetCrop: () => set(() => initialState),
      sellCrop: () => {
        let result;
        set((state) => {
          const { stage, level, rarity } = state;
          const { addCoin, addGem } = useStoreShop.getState();
          result = calculateSellReward(stage, level, rarity);
          const { coin, gem } = result;
          addCoin(coin);
          addGem(gem);
          return initialState;
        });
        return result;
      },
      // Growing actions
      tickTime: () => set((state) => ({ ...state, time: state.time + 1 })),
      updateTime: (time) => set((state) => ({ ...state, time })),
      growUp: () =>
        set((state) => {
          const { stage, level, rarity, isFertilized, isLuckyClover, preGraft } = state;
          // Check if not plant is growing
          if (!stage || !level) return state;

          // Roll possibility for growing up chance
          if (!probability(isFertilized ? growUpChanceFertilized : growUpChance)) return state;

          // Handle change SPROUT to TREE case (add rarity, change stage & reset level)
          if (stage === "sprout" && state.level === 1) {
            const treeRarity =
              preGraft?.rarity || rollRarity(isLuckyClover ? posibilityByRaritiesWithClover : posibilityByRarities);

            const treeVariant = preGraft?.variant || randomInRange(1, maxTreeVariantByRarities[treeRarity - 1]);

            return {
              ...state,
              stage: "tree",
              rarity: treeRarity,
              variant: treeVariant,
              level: 1,
              isLuckyClover: false,
            };
          }

          // Handle max level tree upto 50 levels
          if (stage === "tree" && level === rarity * 10) return { ...state };

          // Handle grow up level case (both sprout and tree) - Only sprout change variant on level up
          return {
            ...state,
            level: level + 1,
            ...(stage === "sprout" && { variant: randomInRange(1, maxSproutVariantbyLevels[level - 1]) }),
          };
        }),

      // Addon actions
      fertilize: () => set((state) => ({ ...state, isFertilized: true })),
      useClover: () => set((state) => ({ ...state, isLuckyClover: true })),
    }),
    {
      name: "Grow",
    }
  )
);

export default useStoreGrow;
