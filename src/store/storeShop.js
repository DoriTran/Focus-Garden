import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreShop = create(
  persist(
    (set) => ({
      /* ==> SHOP STATE */
      // Currency
      coin: 10000,
      gem: 1000,
      // Inventory items
      fertilizer: 0,
      luckyClover: 0,
      graftingShear: 0,
      // Bought decorations (add later)

      // Shop actions
      addCoin: (amount) => set((state) => ({ ...state, coin: state.coin + amount })),
      addGem: (amount) => set((state) => ({ ...state, gem: state.gem + amount })),
      buyItem: (item, price) =>
        set((state) => ({
          ...state,
          [item]: state[item] + 1,
          ...(price.coin > 0 && { coin: state.coin - price.coin }),
          ...(price.gem > 0 && { gem: state.gem - price.gem }),
        })),
      adjustItem: (item, amount) => set((state) => ({ ...state, [item]: state[item] + amount })),

      /* ==> LOGIC STATE */
      selectedItemIndex: 0,
      setSelectedItemIndex: (id) => set((state) => ({ ...state, selectedItemIndex: id })),
    }),
    {
      name: "Shop",
    }
  )
);

export default useStoreShop;
