import { useStoreGarden } from "store";

function getCostForNewSpot() {
  const { maxSpots } = useStoreGarden.getState();
  const nextMaxSpot = maxSpots + 1;

  return {
    coin: Math.round((nextMaxSpot - 10) ** 1.5 * 3 + 10),
    gem: nextMaxSpot % 5 === 0 ? (nextMaxSpot - 10) / 5 : 0,
  };
}

export default getCostForNewSpot;
