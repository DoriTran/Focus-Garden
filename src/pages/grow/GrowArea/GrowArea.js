import { SproutTree } from "components";
import { useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import styles from "./GrowArea.module.scss";

const GrowArea = () => {
  const { stage, level, variant, rarity } = useStoreGrow(
    useShallow((state) => ({
      stage: state.stage,
      level: state.level,
      variant: state.variant,
      rarity: state.rarity,
    }))
  );

  return (
    <div className={styles.wrapper}>
      <SproutTree stage={stage} level={level} rarity={rarity} variant={variant} />
    </div>
  );
};

export default GrowArea;
