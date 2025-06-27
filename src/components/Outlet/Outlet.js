import { Outlet as DomLibOutlet } from "react-router-dom";
import NavigationBtn from "./NavigateBtn/NavigationBtn";
import styles from "./Outlet.module.scss";

const Outlet = () => {
  return (
    <main className={styles.main}>
      <NavigationBtn />
      <DomLibOutlet />
    </main>
  );
};

export default Outlet;
