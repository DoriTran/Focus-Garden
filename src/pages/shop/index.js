import { useState } from "react";
import Actions from "./Actions/Actions";
import Background from "./Background/Background";
import Currency from "./Currency/Currency";
import ItemsDisplay from "./ItemsDisplay/ItemsDisplay";
import styles from "./index.module.scss";

const Shop = () => {
  const [hoverBuyChecking, setHoverChecking] = useState(false);

  return (
    <div className={styles.container}>
      <Background />
      <Currency checkData={hoverBuyChecking} />
      <Actions setChecking={setHoverChecking} />
      <ItemsDisplay />
    </div>
  );
};

export default Shop;
