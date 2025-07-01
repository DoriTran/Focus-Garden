const items = [
  { id: "id-items-gardenspot", key: "gardenSpots", imgPath: `url("/sprites/shop/items/newspot.png")`, name: "Garden Spot" },
  {
    id: "id-items-fertilizer",
    key: "fertilizer",
    imgPath: `url("/sprites/shop/items/fertilizer.png")`,
    name: "Fertilizer",
    price: { gem: 2 },
  },
  {
    id: "id-items-4leafclover",
    key: "luckyClover",
    imgPath: `url("/sprites/shop/items/4leafclover.png")`,
    name: "Lucky Clover",
    price: { gem: 3 },
  },
  {
    id: "id-items-graftingshear",
    key: "graftingShear",
    imgPath: `url("/sprites/shop/items/graftingshear.png")`,
    name: "Grafting Shear",
    price: { gem: 1, coin: 250 },
  },
];

export default items;
