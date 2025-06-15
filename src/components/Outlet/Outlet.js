import { Outlet as DomLibOutlet, useNavigate } from "react-router-dom";
import GardenButton from "./GardenButton/GardenButton";
import styles from "./Outlet.module.scss";

const Outlet = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <GardenButton />
      <DomLibOutlet />
      <button onClick={() => navigate("/shop")} style={{ marginTop: 100 }}>
        Shop
      </button>
    </main>
  );
};

export default Outlet;
