import { ApDragDrop, ApIcon, SproutTree } from "components";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { toUserTimeFormat } from "utils";
import { useCallback, useState } from "react";
import clsx from "clsx";
import styles from "./Plant.module.scss";

const Plant = ({ plant }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const onToolDropOnPlant = useCallback(
    ({ source: { data } }) => {
      const { tool, useTool } = data;
      useTool(plant);
      setIsDragOver(false);
    },
    [plant]
  );

  return (
    <div className={styles.container}>
      <ApDragDrop
        onCatch={onToolDropOnPlant}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        <div className={clsx(styles.plant, { [styles.plantSelected]: isDragOver })}>
          <SproutTree scale={0.75} noShift {...plant} />
        </div>
      </ApDragDrop>
      <div className={styles.wrapper}>
        {plant.favorite && (
          <div className={styles.favorite}>
            <ApIcon icon={faHeart} size={28} color="var(--favorite)" />
          </div>
        )}
        {(plant.rarity > 0 || plant.preGraft?.rarity) && (
          <div className={styles.rarity}>
            <ApIcon icon={faStar} size={32} color={`var(--tree-r${plant.rarity || plant.preGraft?.rarity})`} />
            <div className={styles.num}>{plant.rarity || plant.preGraft?.rarity}</div>
          </div>
        )}
        <div className={styles.level} {...(plant.level === plant.rarity * 10 && { style: { fontWeight: "bold" } })}>
          Lv {plant.level}
        </div>
      </div>
      <div className={styles.time}>{toUserTimeFormat(plant.time)}</div>
    </div>
  );
};

export default Plant;
