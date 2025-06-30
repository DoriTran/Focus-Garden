import { faHeart, faSprout, faStar } from "@fortawesome/free-solid-svg-icons";
import { ApIcon } from "components";
import clsx from "clsx";
import { useStoreGarden } from "store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo } from "react";
import styles from "./FilterPlant.module.scss";

const FilterPlant = () => {
  const { filter, toggleFilter, resetFilter } = useStoreGarden(
    useShallow((state) => ({ filter: state.filter, toggleFilter: state.toggleFilter, resetFilter: state.resetFilter }))
  );

  const colors = useMemo(() => {
    const result = {
      favorite: {
        icon: `var(--favorite${filter.favorite ? "-bg" : ""})`,
        wrapper: `var(--favorite${filter.favorite ? "" : "-bg"})`,
      },
      sprout: {
        icon: `var(--sprout${filter.sprout ? "-bg" : ""})`,
        wrapper: `var(--sprout${filter.sprout ? "" : "-bg"})`,
      },
    };

    for (let i = 1; i <= 5; i++) {
      result[i] = {
        icon: `var(--tree${filter[i] ? "-bg" : `-r${i}`})`,
        wrapper: `var(--tree${filter[i] ? `-r${i}` : "-bg"})`,
      };
    }

    return result;
  }, [filter]);

  useEffect(() => {
    return resetFilter();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.filterBtn, styles.favorite, { [styles.favoriteSelected]: filter.favorite })}
        style={{ backgroundColor: colors.favorite.wrapper }}
        onClick={() => toggleFilter("favorite")}
      >
        <ApIcon icon={faHeart} size={28} color={colors.favorite.icon} />
      </div>
      <div
        className={clsx(styles.filterBtn, styles.sprout, styles.oval, { [styles.sproutSelected]: filter.sprout })}
        style={{ backgroundColor: colors.sprout.wrapper }}
        onClick={() => toggleFilter("sprouts")}
      >
        <ApIcon icon={faSprout} size={25} color={colors.sprout.icon} /> 12
      </div>
      {[1, 2, 3, 4, 5].map((rarity) => (
        <div
          key={`rarity ${rarity}`}
          className={clsx(styles.filterBtn, styles.tree, styles.oval, { [styles.treeSelected]: filter[rarity] })}
          style={{ backgroundColor: colors[rarity].wrapper }}
          onClick={() => toggleFilter(rarity)}
        >
          <div className={styles.number}>{rarity}</div>
          <ApIcon icon={faStar} size={30} color={colors[rarity].icon} /> 12
        </div>
      ))}
    </div>
  );
};

export default FilterPlant;
