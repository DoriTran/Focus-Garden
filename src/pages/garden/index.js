import { ApScrollbar } from "components";
import { useEffect, useRef } from "react";
import Actions from "./Actions/Actions";
import GardenPlants from "./GardenPlants/GardenPlants";

const Garden = () => {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  }, []);

  return (
    <ApScrollbar ref={scrollRef} hidden>
      <Actions />
      <GardenPlants />
    </ApScrollbar>
  );
};

export default Garden;
