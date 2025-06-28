import { ApScrollbar } from "components";
import { useRef } from "react";
import Background from "./Background/Background";
import Actions from "./Actions/Actions";
import GardenPlants from "./GardenPlants/GardenPlants";

const Garden = () => {
  const scrollRef = useRef(null);

  return (
    <ApScrollbar ref={scrollRef} swap hidden>
      <Background />
      <Actions />
      <GardenPlants />
    </ApScrollbar>
  );
};

export default Garden;
