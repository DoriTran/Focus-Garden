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
  let extraCoins = [];
  let baseCoin = 10 + level * rarity;
  extraCoinByPercent.forEach((ex) => {
    const extra = Math.floor((baseCoin * ex) / 100);
    extraCoins.push(`(+${extra})`);
    baseCoin += extra;
  });
  extraCoins = extraCoins.join(" ");

  // Gem gain calculation
  let baseGem = 0;
  let extraGems = "";
  while (probability(gemPosibilityByRarities[rarity - 1])) baseGem += 1;
  if (probability(Math.min(level), rarity * 10)) {
    baseGem *= 2;
    if (baseGem === 0) {
      baseGem = rarity;
      extraGems = `(+${rarity} by Rarity)`;
    } else extraGems = "(x2 by Rarity)";
  }

  return { coin: baseCoin, gem: baseGem, extraCoins, extraGems };
}

export default calculateSellReward;
