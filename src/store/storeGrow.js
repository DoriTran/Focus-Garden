import { probability, randomInRange, rollRarity } from "utils";
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
  favorite: false,
  isFertilized: false,
  isLuckyClover: false,
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
const gemPosibilityByRarities = [5, 10, 20, 35, 60];
const growUpChance = 0.05;
const growUpChanceFertilized = 0.1;

const useStoreGrow = create(
  persist(
    (set) => ({
      ...initialState,
      isFertilized: false,
      isLuckyClover: false,

      // Plant actions
      growNewPlant: () =>
        set((state) => ({ ...state, ...newPlantState, variant: randomInRange(1, maxSproutVariantbyLevels[0]) })),
      choosePlant: (payload) => set((state) => ({ ...state, ...payload })),
      toggleFavorite: () => set((state) => ({ ...state, favorite: !state.favorite })),
      resetCrop: () => set(() => initialState),
      sellCrop: () =>
        set((state) => {
          const { stage, level, rarity, variant } = state;
          const { addCoin, addGem } = useStoreShop.getState();

          if (stage === "sprout") addCoin(level);
          else {
            // Coin gain calculation
            const extraCoinByPercent = [];
            while (extraCoinByPercent.length < 3) {
              const extra = Math.floor(Math.random() * 99) + 1;
              const percent = 100 - extra;
              if (probability(percent)) extraCoinByPercent.push(extra);
              else break;
            }
            let baseCoin = 10 + level * rarity;
            extraCoinByPercent.forEach((extra) => {
              baseCoin += Math.floor((baseCoin * extra) / 100);
            });
            addCoin(baseCoin);

            // Gem gain calculation
            let baseGem = 0;
            while (probability(gemPosibilityByRarities[rarity - 1])) baseGem += 1;
            if (baseGem) addGem(baseGem);
          }
          return initialState;
        }),

      // Growing actions
      tickTime: () => set((state) => ({ ...state, time: state.time + 1 })),
      updateTime: (time) => set((state) => ({ ...state, time })),
      growUp: () =>
        set((state) => {
          const { stage, level, isFertilized, isLuckyClover } = state;
          // Check if not plant is growing
          if (!stage || !level) return state;

          // Roll possibility for growing up chance
          if (!probability(isFertilized ? growUpChanceFertilized : growUpChance)) return state;

          // Handle change sprout to tree case (add rarity, change stage & reset level)
          if (stage === "sprout" && state.level === 9) {
            const treeRarity = rollRarity(isLuckyClover ? posibilityByRaritiesWithClover : posibilityByRarities);

            return {
              ...state,
              stage: "tree",
              rarity: treeRarity,
              variant: randomInRange(1, maxTreeVariantByRarities[treeRarity - 1]),
              level: 1,
              isLuckyClover: false,
            };
          }

          // Handle max level tree upto 15 levels
          if (stage === "tree" && level === 15) return { ...state, level: 15 };

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
