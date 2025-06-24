import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreShop = create(
  persist(
    (set) => ({
      // Currency
      coin: 0,
      gem: 0,
      // Inventory items
      fertilizer: 0,
      luckyClover: 0,
      graftingShear: 0,
      // Bought decorations (add later)

      // Shop actions
      addCoin: (amount) => set((state) => ({ ...state, coin: state.coin + amount })),
      addGem: (amount) => set((state) => ({ ...state, gem: state.gem + amount })),
      adjustItem: (item, amount) => set((state) => ({ ...state, [item]: state[item] + amount })),
    }),
    {
      name: "Shop",
    }
  )
);

export default useStoreShop;
