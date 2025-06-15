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
  const [frontColor, setFrontColor] = useState(location.pathname === "/shop" ? "grow" : "shop");
  useEffect(() => {
    let handler = null;

    if (location.pathname !== "/shop") {
      handler = setTimeout(() => {
        setFrontIcon(faSeedling);
        setFrontColor("grow");
      }, 600);
    } else {
      setFrontIcon(faBagShopping);
      setFrontColor("shop");
    }

    return () => clearTimeout(handler);
  }, [location.pathname]);

  return (
    <div className={clsx(styles.wrapper, { [styles.flipped]: isGarden })} onClick={handleClick}>
      <div className={styles.inner}>
        <div className={clsx(styles.face, styles.front)} style={{ border: `8px solid var(--${frontColor})` }}>
          <ApIcon icon={frontIcon} color={`var(--${frontColor})`} size={28} />
        </div>
        <div className={clsx(styles.face, styles.back)}>
          <ApIcon icon={faTree} color="var(--garden)" size={28} />
        </div>
      </div>
    </div>
  );
};

export default GardenButton;
