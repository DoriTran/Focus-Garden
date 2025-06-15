import { faSeedling, faTree } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import ApIcon from "components/ApIcon/ApIcon";
import styles from "./GardenButton.module.scss";

const GardenButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGarden = location.pathname === "/garden";

  const handleClick = () => {
    console.log(location.pathname);
    // navigate(isGarden === "/garden" ? "/grow" : "/garden");
  };

  return (
    <div className={clsx(styles.wrapper, { [styles.flipped]: !isGarden })} onClick={handleClick}>
      <div className={styles.inner}>
        <div className={clsx(styles.face, styles.front)}>
          <ApIcon icon={faSeedling} />
        </div>
        <div className={clsx(styles.face, styles.back)}>
          <ApIcon icon={faTree} />
        </div>
      </div>
    </div>
  );
};

export default GardenButton;
