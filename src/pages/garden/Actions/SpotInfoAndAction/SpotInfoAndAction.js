import { useState } from "react";
import { ApIcon } from "components";
import { Divider } from "@mui/material";
import { useStoreGarden } from "store";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import styles from "./SpotInfoAndAction.module.scss";

const SpotInfoAndAction = () => {
  const [isHover, setIsHover] = useState(false);

  const { usedSpots, maxSpots } = useStoreGarden(
    useShallow((state) => ({ usedSpots: state.usedSpots, maxSpots: state.maxSpots }))
  );

  return (
    <div className={styles.container} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={styles.icon}>
        <ApIcon icon={isHover ? "layerPlus" : "trees"} customSVG color="var(--garden)" size={isHover ? 40 : 45} />
      </div>
      <div className={styles.info}>
        <div className={clsx(styles.text, { [styles.textMaximized]: usedSpots === maxSpots })}>{usedSpots}</div>
        <Divider
          sx={{
            width: "50px",
            borderColor: "var(--garden)",
            borderBottomWidth: "4px",
            borderRadius: "2px",
          }}
        />
        <div className={clsx(styles.text, { [styles.textMaximized]: usedSpots === maxSpots })}>{maxSpots}</div>
      </div>
    </div>
  );
};

export default SpotInfoAndAction;
