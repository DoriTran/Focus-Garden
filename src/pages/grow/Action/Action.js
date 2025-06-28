import { useCallback } from "react";
import { useStoreGarden, useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import ActBtn from "./ActBtn";
import styles from "./Action.module.scss";

const Action = () => {
  const { resetCrop, sellCrop, toggleFavorite } = useStoreGrow(
    useShallow((state) => ({ resetCrop: state.resetCrop, sellCrop: state.sellCrop, toggleFavorite: state.toggleFavorite }))
  );
  const plant = useStoreGrow(
    useShallow((state) => ({
      id: state.id,
      stage: state.stage,
      level: state.level,
      rarity: state.rarity,
      variant: state.variant,
      time: state.time,
      favorite: state.favorite,
    }))
  );
  const addPlant = useStoreGarden((state) => state.addPlant);

  const moveToGarden = useCallback(() => {
    addPlant(plant);
    resetCrop();
  }, [plant]);

  const sellTheCrop = useCallback(() => {
    sellCrop();
  }, []);

  const changeFavorite = useCallback(() => {
    toggleFavorite();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ActBtn
        icon={plant.favorite ? faHeart : faHeartCrack}
        color={plant.favorite ? "var(--favorite)" : "var(--unfavorite)"}
        onClick={changeFavorite}
        isActive={plant.stage}
      />
      <ActBtn icon="shovel" customSVG color="var(--garden)" onClick={moveToGarden} isActive={plant.stage} />
      <ActBtn icon="axe" customSVG color="var(--shop)" onClick={sellTheCrop} isActive={plant.stage === "tree"} />
    </div>
  );
};

export default Action;
