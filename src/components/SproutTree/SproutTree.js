import { useEffect, useMemo } from "react";
import { defaultTreePreStyle, sproutPreStyle, treePreStyle } from "./preData";
import styles from "./SproutTree.module.scss";

// stage = sprout | tree
// level = 1-8
// variant = number

const SproutTree = ({ scale = 1, shift = 0, stage, level, variant, rarity }) => {
  const styleData = useMemo(() => {
    // For empty slot
    if (!stage) return {};

    // For sprout stage and variants
    if (stage === "sprout") return sproutPreStyle[level] || sproutPreStyle[1];

    // For tree variants
    return {
      ...defaultTreePreStyle(level),
      ...(treePreStyle[rarity][variant] && { marginBottom: treePreStyle[rarity][variant] }),
    };
  }, [stage, level, variant]);

  const customStyleData = useMemo(() => {
    const stylesData = {
      width: Math.floor(styleData.width * scale),
      height: Math.floor(styleData.height * scale),
      ...(shift && { marginBottom: shift }),
    };
    return stylesData;
  }, [styleData, scale, shift]);

  const pathToSprite = useMemo(() => {
    // For sprout stage and variants
    if (stage === "sprout") return `/sprites/sprout/stage ${level}/${variant}.png`;

    // For tree variants
    return `/sprites/tree/rarity ${rarity}/${variant}.png`;
  }, [stage, level, variant]);

  return (
    <div className={styles.wrapper} style={customStyleData}>
      <div style={{ backgroundImage: `url("${pathToSprite}")` }} className={styles.sproutTree} />
    </div>
  );
};

export default SproutTree;
