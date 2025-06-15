import { SproutTree } from "components";
import styles from "./GrowArea.module.scss";

const GrowArea = () => {
  return (
    <div className={styles.wrapper}>
      <SproutTree stage="tree" level={15} rarity={2} variant={9} />
    </div>
  );
};

export default GrowArea;
