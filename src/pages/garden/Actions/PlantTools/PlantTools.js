import { useStoreGarden, useStoreGrow, useStoreShop } from "store";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import { getCurrentUnixTime, randomInRange } from "utils";
import { maxSproutVariantbyLevels } from "store/storeGrow";
import { data } from "react-router-dom";
import { useSnackbar } from "notistack";
import Tool from "./Tool/Tool";
import styles from "./PlantTools.module.scss";

const PlantTools = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { toggleFavorite, sellPlant, removePlant, addPlant, usedSpots, maxSpots } = useStoreGarden(
    useShallow((state) => ({
      toggleFavorite: state.toggleFavorite,
      sellPlant: state.sellPlant,
      removePlant: state.removePlant,
      addPlant: state.addPlant,
      usedSpots: state.usedSpots,
      maxSpots: state.maxSpots,
    }))
  );
  const { stage, choosePlant } = useStoreGrow(
    useShallow((state) => ({ stage: state.stage, choosePlant: state.choosePlant }))
  );
  const graftingShear = useStoreShop((state) => state.graftingShear);

  const sellPlantAndNotify = useCallback(
    (plant) => {
      const { coin, gem, extraCoins, extraGems } = sellPlant(plant);
      enqueueSnackbar(`Collect ${coin} Coin!${extraCoins && ` ${extraCoins}`}`, { variant: "coin" });
      if (gem > 0) enqueueSnackbar(`Collect ${gem} Gem!${extraGems && ` ${extraGems}`}`, { variant: "gem" });
    },
    [sellPlant]
  );

  const movePlantToGarden = useCallback(
    (plant) => {
      if (stage) enqueueSnackbar(`Grow area is occupied!`, { variant: "fail" });
      else {
        choosePlant(plant);
        removePlant(plant);
      }
    },
    [removePlant, choosePlant]
  );

  const shearPlantForSprout = useCallback(
    (plant) => {
      if (usedSpots === maxSpots) {
        enqueueSnackbar(`Garden is full! (${usedSpots} / ${maxSpots})`, { variant: "fail" });
        return;
      }
      addPlant({
        id: getCurrentUnixTime(),
        stage: "sprout",
        level: 1,
        variant: randomInRange(1, maxSproutVariantbyLevels[1]),
        rarity: 0,
        time: 0,
        favorite: false,
        preGraft: { rarity: plant.rarity, variant: plant.variant },
      });
    },
    [addPlant]
  );

  return (
    <div className={styles.container}>
      <Tool name="heart" onUse={(plant) => toggleFavorite(plant)} />
      <Tool name="axe" onUse={(plant) => sellPlantAndNotify(plant)} />
      <Tool name="shovel" onUse={(plant) => movePlantToGarden(plant)} />
      <Tool name="shear" uses={graftingShear} onUse={(plant) => shearPlantForSprout(plant)} />
    </div>
  );
};

export default PlantTools;
