import { ApIcon, SproutTree } from "components";
import { faHeart, faHeartBroken, faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./Plant.module.scss";

const Plant = ({ plant }) => {
  return (
    <div className={styles.container}>
      <SproutTree {...plant} />
      <div className={styles.wrapper}>
        <div className={styles.favorite}>
          <ApIcon icon={plant.favorite ? faHeart : faHeartBroken} size={28} />
        </div>
        <div className={styles.rarity}>
          <ApIcon icon={faStar} /> 5
        </div>
        <div className={styles.level}>Lv 10</div>
      </div>
      <div className={styles.time}>1:32:45</div>
    </div>
  );
};

export default Plant;
