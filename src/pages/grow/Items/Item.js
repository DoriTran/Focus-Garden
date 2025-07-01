import { useStoreGrow } from "store";
import clsx from "clsx";
import styles from "./Items.module.scss";

const Item = ({ item, total, used, onClick }) => {
  const stage = useStoreGrow((state) => state.stage);

  return (
    <div className={clsx(styles.itemWrapper, { [styles.itemWrapperUnactive]: !total || (stage && !used) })}>
      <div className={styles.total}>{total}</div>
      <div className={clsx(styles.item, { [styles.itemUsed]: used })} onClick={onClick}>
        <div style={{ backgroundImage: `url("/sprites/shop/items/${item}.png")` }} className={styles.itemImg} />
      </div>
    </div>
  );
};

export default Item;
