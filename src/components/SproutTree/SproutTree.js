import { useEffect, useMemo } from "react";
import { sprout, tree } from "./preData";
import styles from "./SproutTree.module.scss";

// stage = sprout | tree
// level = 1-8
// variant = number

const SproutTree = ({ stage = "sprout", level = 1, variant = 1, rarity = 0 }) => {
  const styleData = useMemo(() => {
    // For sprout stage and variants
    if (stage === "sprout") return sprout[level] || sprout[1];

    // For tree variants
    return { width: 500 + 25 * (level - 1), height: 750 + 25 * (level - 1), marginBottom: -180, ...tree[variant] };
  }, [stage, level, variant]);

  const pathToSprite = useMemo(() => {
    // For sprout stage and variants
    if (stage === "sprout") return `/sprites/sprout/stage ${level}/${variant}.png`;

    // For tree variants
    return `/sprites/tree/rarity ${rarity}/${variant}.png`;
  }, [stage, level, variant]);

  return (
    <div className={styles.wrapper} style={{ ...styleData }}>
      <div style={{ backgroundImage: `url("${pathToSprite}")` }} className={styles.sproutTree} />
    </div>
  );
};

export default SproutTree;
