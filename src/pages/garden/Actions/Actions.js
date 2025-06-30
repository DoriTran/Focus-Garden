import styles from "./Actions.module.scss";
import FilterPlant from "./FilterPlant/FilterPlant";
import PlantTools from "./PlantTools/PlantTools";
import SpotInfoAndAction from "./SpotInfoAndAction/SpotInfoAndAction";

const Actions = () => {
  return (
    <div className={styles.container}>
      <FilterPlant />
      <PlantTools />
      <SpotInfoAndAction />
    </div>
  );
};

export default Actions;
