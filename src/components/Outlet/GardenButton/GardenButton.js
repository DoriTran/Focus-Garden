import { faBagShopping, faSeedling, faTree } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ApIcon from "components/ApIcon/ApIcon";
import clsx from "clsx";
import styles from "./GardenButton.module.scss";

const GardenButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isGarden = location.pathname === "/garden";
  const handleClick = useCallback(() => navigate(isGarden ? "/grow" : "/garden"), [isGarden]);

  const [frontIcon, setFrontIcon] = useState(location.pathname === "/shop" ? faBagShopping : faSeedling);
  useEffect(() => {
    let handler = null;

    if (location.pathname !== "/shop") {
      handler = setTimeout(() => {
        setFrontIcon(faSeedling);
      }, 600);
    } else setFrontIcon(faBagShopping);

    return () => clearTimeout(handler);
  }, [location.pathname]);

  return (
    <div className={clsx(styles.wrapper, { [styles.flipped]: isGarden })} onClick={handleClick}>
      <div className={styles.inner}>
        <div className={clsx(styles.face, styles.front)}>
          <ApIcon icon={frontIcon} />
        </div>
        <div className={clsx(styles.face, styles.back)}>
          <ApIcon icon={faTree} />
        </div>
      </div>
    </div>
  );
};

export default GardenButton;
