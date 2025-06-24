import { useCallback } from "react";
import { useStorePlant, useStoreGarden, useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import ActBtn from "./ActBtn";
import styles from "./Action.module.scss";

const Action = () => {
  const addPlant = useStorePlant((state) => state.addPlant);
  const { addNurseryPlant, isNurseryFull } = useStoreGarden(
    useShallow((state) => ({ addNurseryPlant: state.addNurseryPlant, isNurseryFull: state.isNurseryFull }))
  );
  const { resetCrop, sellCrop } = useStoreGrow(
    useShallow((state) => ({ resetCrop: state.resetCrop, sellCrop: state.sellCrop }))
  );
  const plant = useStoreGrow(
    useShallow((state) => ({
      id: state.id,
      stage: state.stage,
      level: state.level,
      rarity: state.rarity,
      time: state.time,
      favorite: state.favorite,
    }))
  );

  const moveToGarden = useCallback(() => {
    if (isNurseryFull()) return;
    addPlant(plant);
    addNurseryPlant(plant.id);
    resetCrop();
  }, [plant]);

  const sellTheCrop = useCallback(() => {
    sellCrop();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ActBtn icon="shovel" customSVG color="var(--garden)" onClick={moveToGarden} />
      <ActBtn icon="axe" customSVG color="var(--shop)" onClick={sellTheCrop} />
    </div>
  );
};

export default Action;
