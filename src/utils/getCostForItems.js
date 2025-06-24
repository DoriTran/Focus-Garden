const itemCosts = {
  fertilizer: { coin: 100 },
  luckyClover: { gem: 2 },
  graftingShear: { gem: 2 },
};

function getCostForItems(item) {
  return item ? itemCosts[item] : itemCosts;
}

export default getCostForItems;
