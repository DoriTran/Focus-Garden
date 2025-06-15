import { Outlet as DomLibOutlet, useNavigate } from "react-router-dom";
import GardenButton from "./GardenButton/GardenButton";
import styles from "./Outlet.module.scss";

const Outlet = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <GardenButton />
      <DomLibOutlet />
    </main>
  );
};

export default Outlet;
