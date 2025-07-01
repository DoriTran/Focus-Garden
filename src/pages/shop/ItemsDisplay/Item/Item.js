import { useEffect } from "react";
import clsx from "clsx";
import styles from "./Item.module.scss";

const Item = ({ id, imgPath, isSelected, isOutOfBound }) => {
  useEffect(() => {
    if (isSelected) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isSelected]);

  return (
    <div
      id={id}
      className={clsx(styles.container, { [styles.sideContainer]: !isSelected, [styles.outBoundContainer]: isOutOfBound })}
    >
      <div className={styles.bubble} style={{ backgroundImage: `url("/sprites/shop/bubble.png")` }} />
      <div className={styles.item} style={{ backgroundImage: imgPath }} />
    </div>
  );
};

export default Item;
