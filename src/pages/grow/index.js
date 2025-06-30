import { ApScrollbar } from "components";
import { useCallback, useEffect, useRef } from "react";
import { useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import Ground from "./Ground/Ground";
import GrowArea from "./GrowArea/GrowArea";
import Timer from "./Timer/Timer";
import styles from "./index.module.scss";
import Action from "./Action/Action";
import Items from "./Items/Items";

const GrowPage = () => {
  const scrollRef = useRef(null);
  const { stage, level } = useStoreGrow(useShallow((state) => ({ stage: state.stage, level: state.level })));

  useEffect(() => {
    if (stage === "sprout") return;
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, [stage, level]);

  return (
    <ApScrollbar hidden ref={scrollRef}>
      <div className={styles.container}>
        <GrowArea />
        <Ground />
        <Timer />
        <Action />
        <Items />
      </div>
    </ApScrollbar>
  );
};

export default GrowPage;
