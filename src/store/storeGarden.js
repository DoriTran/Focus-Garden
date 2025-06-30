import { calculateSellReward, getCostForNewSpot, getCurrentUnixTime } from "utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useStoreShop from "./storeShop";

// gardens, favorites: { sprouts: [], 1: [], 2: [], 3: [], 4: [], 5: [] }
const useStoreGarden = create(
  persist(
    (set) => ({
      gardens: { sprouts: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
      favorites: { sprouts: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
      usedSpots: 0,
      maxSpots: 10,
      filter: {},

      // Garden actions
      addPlant: (plant) =>
        set((state) => {
          const { gardens, favorites, usedSpots, maxSpots } = state;
          // Check if there is space in the garden
          if (usedSpots === maxSpots) return state;

          // If plant is favorite, add it to favorites, otherwise to gardens
          const { stage, rarity, favorite } = plant;
          const update = getCurrentUnixTime();

          const target = favorite ? { ...favorites } : { ...gardens };
          const category = stage === "sprout" ? "sprouts" : rarity;
          target[category].unshift({ ...plant, update });
          return { ...state, [favorite ? "favorites" : "gardens"]: target, usedSpots: usedSpots + 1 };
        }),
      removePlant: (plant) =>
        set((state) => {
          const { gardens, favorites, usedSpots } = state;
          const { stage, rarity, favorite } = plant;

          // Remove plant from gardens or favorites
          const target = favorite ? { ...favorites } : { ...gardens };
          const category = stage === "sprout" ? "sprouts" : rarity;
          target[category] = target[category].filter((p) => p.id !== plant.id);
          return { ...state, [favorite ? "favorites" : "gardens"]: target, usedSpots: usedSpots - 1 };
        }),
      toggleFavorite: (plant) =>
        set((state) => {
          const { favorites, gardens } = state;
          const { stage, rarity, favorite } = plant;
          const category = stage === "sprout" ? "sprouts" : rarity;

          const from = favorite ? { ...favorites } : { ...gardens };
          const to = favorite ? { ...gardens } : { ...favorites };

          // Remove from current collection
          from[category] = from[category].filter((p) => p.id !== plant.id);

          // Toggle favorite status and reinsert into other collection
          const updatedPlant = { ...plant, favorite: !favorite };
          to[category] = [...to[category], updatedPlant];

          return { ...state, favorites: favorite ? from : to, gardens: favorite ? to : from };
        }),
      buyGardenSpot: () =>
        set((state) => {
          const { coin, gem, addCoin, addGem } = useStoreShop.getState();
          const { coinst: neededCoin, gem: neededGem } = getCostForNewSpot();

          if (coin < neededCoin || gem < neededGem) return state;
          addCoin(-neededCoin);
          addGem(-neededGem);
          return { ...state, maxSpots: state.maxSpots + 1 };
        }),
      sellPlant: (plant) => {
        let result;
        set((state) => {
          const { gardens, favorites, usedSpot } = state;
          const { stage, level, rarity, favorite } = plant;

          const { addCoin, addGem } = useStoreShop.getState();
          result = calculateSellReward(stage, level, rarity);
          const { coin, gem } = result;
          addCoin(coin);
          addGem(gem);

          const target = favorite ? { ...favorites } : { ...gardens };
          const category = stage === "sprout" ? "sprouts" : rarity;
          target[category] = target[category].filter((p) => p.id !== plant.id);

          return { ...state, [favorite ? "favorites" : "gardens"]: target, usedSpot: usedSpot - 1 };
        });
        return result;
      },
      toggleFilter: (filter) =>
        set((state) => ({
          ...state,
          filter: {
            ...state.filter,
            [filter]: !state.filter?.[filter],
          },
        })),
      resetFilter: () => set((state) => ({ ...state, filter: {} })),
    }),
    {
      name: "Garden",
    }
  )
);
export default useStoreGarden;
