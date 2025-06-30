import { useCallback } from "react";
import { useStoreGarden, useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { useSnackbar } from "notistack";
import ActBtn from "./ActBtn";
import styles from "./Action.module.scss";

const Action = () => {
  const { enqueueSnackbar } = useSnackbar();
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
  const { addPlant, usedSpots, maxSpots } = useStoreGarden(
    useShallow((state) => ({
      addPlant: state.addPlant,
      usedSpots: state.usedSpots,
      maxSpots: state.maxSpots,
    }))
  );

  const moveToGarden = useCallback(() => {
    if (usedSpots === maxSpots) {
      enqueueSnackbar(`Garden is full! (${usedSpots} / ${maxSpots})`, { variant: "fail" });
      return;
    }
    addPlant(plant);
    resetCrop();
  }, [plant]);

  const sellTheCrop = useCallback(() => {
    const { coin, gem, extraCoins, extraGems } = sellCrop();
    enqueueSnackbar(`Collect ${coin} Coin!${extraCoins && ` ${extraCoins}`}`, { variant: "coin" });
    if (gem > 0) enqueueSnackbar(`Collect ${gem} Gem!${extraGems && ` ${extraGems}`}`, { variant: "gem" });
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
