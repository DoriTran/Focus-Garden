import randomInRange from "./randomInRange";
import probability from "./probability";

const gemPosibilityByRarities = [5, 10, 20, 35, 60];

function calculateSellReward(stage, level, rarity) {
  if (stage === "sprout") return { coin: level };

  // Coin gain calculation
  const extraCoinByPercent = [];
  while (extraCoinByPercent.length < 3) {
    const extra = randomInRange(1, 99);
    const percent = 100 - extra;
    if (probability(percent)) extraCoinByPercent.push(extra);
    else break;
  }
  let baseCoin = 10 + level * rarity;
  extraCoinByPercent.forEach((extra) => {
    baseCoin += Math.floor((baseCoin * extra) / 100);
  });

  // Gem gain calculation
  let baseGem = 0;
  while (probability(gemPosibilityByRarities[rarity - 1])) baseGem += 1;
  if (probability(Math.min(level), rarity * 10)) {
    baseGem *= 2;
    if (baseGem === 0) baseGem = rarity;
  }

  return { coin: baseCoin, gem: baseGem };
}

export default calculateSellReward;
