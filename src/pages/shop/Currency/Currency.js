import { useStoreShop } from "store";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import styles from "./Currency.module.scss";

const Currency = ({ checkData }) => {
  const { coin, gem } = useStoreShop(useShallow((state) => ({ coin: state.coin, gem: state.gem })));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={clsx(styles.number, styles.coin, { [styles.notEnough]: checkData?.coin > coin })}>{coin}</div>
        <div style={{ backgroundImage: `url("/sprites/currency/coin.png")` }} className={styles.currencyImg} />
      </div>
      <div className={styles.wrapper}>
        <div className={clsx(styles.number, styles.gem, { [styles.notEnough]: checkData?.gem > gem })}>{gem}</div>
        <div style={{ backgroundImage: `url("/sprites/currency/gem.png")` }} className={styles.currencyImg} />
      </div>
    </div>
  );
};

export default Currency;
