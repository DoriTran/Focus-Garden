import { create } from "zustand";
import { persist } from "zustand/middleware";
import { maxSproutVariantbyLevels, maxTreeVariantByRarities } from "./storeGrow";
import useStoreShop from "./storeShop";

// Collection state item: 1: [[true | false | null]]
// Mean: Rarity | Level 1 has {variant}: {collected? discovered? = null}
const initialState = {
  sprout: maxSproutVariantbyLevels.map((variantBylevel) => Array(variantBylevel).fill(null)),
  tree: maxTreeVariantByRarities.map((variantByRarity) => Array(variantByRarity).fill(null)),
};

const useStoreCollection = create(
  persist(
    (set) => ({
      ...initialState,

      // Collection actions
      discoverPlant: (plant) =>
        set((state) => {
          const newState = { ...state };
          const { stage, rarity, level, variant } = plant;
          newState[stage][(stage === "tree" ? rarity : level) - 1][variant - 1] = false; // null → false
          return newState;
        }),
      collectReward: (plant) =>
        set((state) => {
          const newState = { ...state };
          const { stage, rarity, level, variant } = plant;
          newState[stage][(stage === "tree" ? rarity : level) - 1][variant - 1] = true; // false → true

          const { addCoin, addGem } = useStoreShop.getState();
          if (stage === "sprout") addCoin(level);
          else addGem(rarity);

          return newState;
        }),
    }),
    {
      name: "Collection",
    }
  )
);

export default useStoreCollection;
