import { useMemo } from "react";
import { sprout, tree } from "./preData";
import styles from "./SproutTree.module.scss";

// stage = sprout | tree
// level = 1-8
// variant = number

const SproutTree = ({ stage = "sprout", level = 1, variant = 1 }) => {
  const size = useMemo(() => {
    // For sprout stage and variants
    if (stage === "sprout") return sprout[level] || sprout[1];

    // For tree variants
    return { width: 500, height: 750, marginBottom: -180, ...tree[variant] };
  }, [stage, level, variant]);

  return (
    <div className={styles.wrapper} style={{ ...size }}>
      <div
        style={{ backgroundImage: `url(/sprites/${stage}/${stage === "sprout" ? level : variant}.png)` }}
        className={styles.sproutTree}
      />
    </div>
  );
};

export default SproutTree;
