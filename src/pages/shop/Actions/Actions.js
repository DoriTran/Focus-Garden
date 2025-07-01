import { useStoreShop, useStoreGarden } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCallback, useMemo } from "react";
import clsx from "clsx";
import { getCostForNewSpot } from "utils";
import items from "../_ItemsData/items";
import styles from "./Actions.module.scss";

const Actions = ({ setChecking }) => {
  const { coin, gem, fertilizer, luckyClover, graftingShear, selectedItemIndex, setSelectedItemIndex, buyItem } =
    useStoreShop(
      useShallow((state) => ({
        coin: state.coin,
        gem: state.gem,
        fertilizer: state.fertilizer,
        luckyClover: state.luckyClover,
        graftingShear: state.graftingShear,
        selectedItemIndex: state.selectedItemIndex,
        setSelectedItemIndex: state.setSelectedItemIndex,
        buyItem: state.buyItem,
      }))
    );
  const { maxSpots, buyGardenSpot } = useStoreGarden(
    useShallow((state) => ({ maxSpots: state.maxSpots, buyGardenSpot: state.buyGardenSpot }))
  );
  const ownItems = useMemo(() => {
    return { fertilizer, luckyClover, graftingShear, gardenSpots: maxSpots };
  }, [fertilizer, luckyClover, graftingShear, maxSpots]);
  const selectedItem = useMemo(() => {
    let { price } = items[selectedItemIndex];
    if (!price) price = getCostForNewSpot();
    return {
      ...items[selectedItemIndex],
      owned: ownItems[items[selectedItemIndex].key],
      price,
      notEnough: coin < price.coin || gem < price.gem,
    };
  }, [ownItems, selectedItemIndex, maxSpots]);

  const changeItem = useCallback(
    (direction) => {
      if (direction === "next" && selectedItemIndex < items.length - 1) setSelectedItemIndex(selectedItemIndex + 1);
      else if (selectedItemIndex > 0) setSelectedItemIndex(selectedItemIndex - 1);
    },
    [selectedItemIndex]
  );

  const buyNewItem = useCallback((item) => {
    if (item.notEnough) return;
    if (item.name === "Garden Spot") buyGardenSpot();
    else buyItem(item.key, item.price);
  }, []);

  return (
    <div className={styles.container}>
      <div className={clsx(styles.arrowWrapper, styles.left)}>
        <div
          className={clsx(styles.arrowBtn, { [styles.arrowBtnOut]: selectedItemIndex === 0 })}
          style={{ backgroundImage: `url("/sprites/shop/left.png")` }}
          onClick={() => changeItem("prev")}
        />
      </div>
      <div className={styles.wrapper}>
        <div
          className={clsx(styles.buyBtn, { [styles.buyBtnNotEnoughMoney]: selectedItem.notEnough })}
          onMouseEnter={() => setChecking(selectedItem.price)}
          onMouseLeave={() => setChecking(null)}
          onClick={() => buyNewItem(selectedItem)}
        >
          <div className={styles.text}>BUY</div>
          {selectedItem.owned !== 0 && <div className={styles.owned}>(Owned {selectedItem.owned})</div>}
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{selectedItem.name}</div>
          <div className={styles.price}>
            {selectedItem.price.coin > 0 && (
              <div className={styles.coin}>
                {selectedItem.price.coin}
                <div className={styles.currencyImg} style={{ backgroundImage: `url("/sprites/currency/coin.png")` }} />
              </div>
            )}
            {selectedItem.price.gem > 0 && (
              <div className={styles.gem}>
                {selectedItem.price.gem}
                <div className={styles.currencyImg} style={{ backgroundImage: `url("/sprites/currency/gem.png")` }} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={clsx(styles.arrowWrapper, styles.right)}>
        <div
          className={clsx(styles.arrowBtn, { [styles.arrowBtnOut]: selectedItemIndex === items.length - 1 })}
          style={{ backgroundImage: `url("/sprites/shop/right.png")` }}
          onClick={() => changeItem("next")}
        />
      </div>
    </div>
  );
};

export default Actions;
