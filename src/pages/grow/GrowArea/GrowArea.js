import { SproutTree } from "components";
import styles from "./GrowArea.module.scss";

const GrowArea = () => {
  return (
    <div className={styles.wrapper}>
      <SproutTree stage="tree" level={1} variant={5} />
    </div>
  );
};

export default GrowArea;
