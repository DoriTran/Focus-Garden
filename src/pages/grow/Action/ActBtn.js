import { ApIcon } from "components";
import { useMemo } from "react";
import styles from "./Action.module.scss";

const ActBtn = ({ icon, ...allProps }) => {
  const border = useMemo(() => {
    if (icon === "shovel") return "8px solid var(--garden)";
    if (icon === "axe") return "8px solid var(--shop)";
  }, [icon]);

  return (
    <div className={styles.btnWrapper} style={{ border }}>
      <ApIcon icon={icon} size={28} {...allProps} />
    </div>
  );
};

export default ActBtn;
