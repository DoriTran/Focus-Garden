import { useStoreGarden } from "store";

function getCostForNewSpot() {
  const { level } = useStoreGarden.getState();
  const nextMaxSpot = level + 1;

  return {
    coin: (nextMaxSpot - 10) ** 1.5 * 3 + 10,
    gem: nextMaxSpot % 5 === 0 ? (nextMaxSpot - 10) / 5 : 0,
  };
}

export default getCostForNewSpot;
