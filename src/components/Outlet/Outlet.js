import { Outlet as DomLibOutlet } from "react-router-dom";
import styles from "./Outlet.module.scss";

const Outlet = () => {
  return (
    <main className={styles.main}>
      <DomLibOutlet />
    </main>
  );
};

export default Outlet;
