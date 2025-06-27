import { ApScrollbar } from "components";
import { useEffect, useRef } from "react";
import Ground from "./Ground/Ground";
import GrowArea from "./GrowArea/GrowArea";
import Timer from "./Timer/Timer";
import styles from "./index.module.scss";
import Action from "./Action/Action";
import Items from "./Items/Items";

const GrowPage = () => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

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
