import { useStoreShop, useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import Item from "./Item";
import styles from "./Items.module.scss";

const Items = () => {
  const { fertilizer, luckyClover } = useStoreShop(
    useShallow((state) => ({ fertilizer: state.fertilizer, luckyClover: state.luckyClover }))
  );
  const { isFertilized, isLuckyClover, stage, fertilize, useClover } = useStoreGrow(
    useShallow((state) => ({
      isFertilized: state.isFertilized,
      isLuckyClover: state.isLuckyClover,
      stage: state.stage,
      fertilize: state.fertilize,
      useClover: state.useClover,
    }))
  );

  const wrapperPosition = useMemo(() => {
    if (stage) return { top: "var(--abs-position)", right: "calc(80px + var(--abs-position))" };
    return { top: "var(--abs-position)", right: "var(--abs-position)" };
  }, [stage]);

  return (
    <div className={styles.wrapper} style={{ ...wrapperPosition }}>
      <Item item="fertilizer" total={fertilizer} used={isFertilized} onClick={() => fertilize()} />
      <Item item="4leafclover" total={luckyClover} used={isLuckyClover} onClick={() => useClover()} />
    </div>
  );
};

export default Items;
