import { useStoreShop, useStoreGarden } from "store";
import clsx from "clsx";
import { useShallow } from "zustand/react/shallow";
import styles from "./GraftingShear.module.scss";

const GraftingShear = () => {
  const total = useStoreShop((state) => state.total);
  const { useGraftingShear, toggleGraftingShear } = useStoreGarden(
    useShallow((state) => ({ useGraftingShear: state.useGraftingShear, toggleGraftingShear: state.toggleGraftingShear }))
  );

  return (
    <div className={styles.container}>
      <div className={styles.total}>{total}</div>
      <div className={clsx(styles.item, { [styles.itemSelected]: useGraftingShear })} onClick={() => toggleGraftingShear()}>
        <div style={{ backgroundImage: `url("/sprites/shop/graftingshear.png")` }} className={styles.itemImg} />
      </div>
    </div>
  );
};

export default GraftingShear;
