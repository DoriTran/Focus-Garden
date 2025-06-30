import { useStoreGarden } from "store";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";
import Plant from "./Plant/Plant";
import Background from "./Background/Background";
import styles from "./GardenPlants.module.scss";

const category = [5, 4, 3, 2, 1, "sprouts"];

const GardenPlants = () => {
  const { favorites, gardens, filter } = useStoreGarden(
    useShallow((state) => ({ favorites: state.favorites, gardens: state.gardens, filter: state.filter }))
  );

  const shouldShow = useMemo(() => {
    const isAtleastOnePlantFilter = category.some((key) => filter[key]);
    return category.reduce((acc, key) => {
      acc[key] = !isAtleastOnePlantFilter || filter[key];
      return acc;
    }, {});
  }, [filter]);

  return (
    <div className={styles.container}>
      <Background />
      <div className={styles.plants}>
        {category.map((cate) => shouldShow[cate] && favorites[cate]?.map((plant) => <Plant key={plant.id} plant={plant} />))}
        {!filter.favorite &&
          category.map((cate) => shouldShow[cate] && gardens[cate]?.map((plant) => <Plant key={plant.id} plant={plant} />))}
      </div>
    </div>
  );
};

export default GardenPlants;
