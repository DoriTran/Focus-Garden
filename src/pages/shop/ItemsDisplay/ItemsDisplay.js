import { ApScrollbar } from "components";
import { useEffect, useRef, useState } from "react";
import { useStoreShop } from "store";
import Item from "./Item/Item";
import styles from "./ItemsDisplay.module.scss";
// import itemStyles from "./Item/Item.module.scss";
import items from "../_ItemsData/items";

const ItemsDisplay = () => {
  const displayRef = useRef(null);
  const selectedItemIndex = useStoreShop((state) => state.selectedItemIndex);

  return (
    <ApScrollbar ref={displayRef} hidden horizontal snap="proximity" className={styles.container}>
      {items.map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          imgPath={item.imgPath}
          isSelected={selectedItemIndex === index}
          isOutOfBound={Math.abs(selectedItemIndex - index) >= 2}
        />
      ))}
    </ApScrollbar>
  );
};

export default ItemsDisplay;
