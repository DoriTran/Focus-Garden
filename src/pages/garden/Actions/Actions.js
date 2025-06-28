import styles from "./Actions.module.scss";
import FilterPlant from "./FilterPlant/FilterPlant";
import GraftingShear from "./GraftingShear/GraftingShear";
import SpotInfoAndAction from "./SpotInfoAndAction/SpotInfoAndAction";

const Actions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FilterPlant />
        <GraftingShear />
      </div>
      <SpotInfoAndAction />
    </div>
  );
};

export default Actions;
