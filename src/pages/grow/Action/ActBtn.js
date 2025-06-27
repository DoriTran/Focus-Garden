import { ApIcon } from "components";
import clsx from "clsx";
import styles from "./Action.module.scss";

const ActBtn = ({ icon, color, onClick, isActive, ...allProps }) => {
  return (
    <div
      className={clsx(styles.btnWrapper, { [styles.btnUnactive]: !isActive })}
      style={{ border: `8px solid ${color}` }}
      onClick={onClick}
    >
      <ApIcon icon={icon} size={28} color={color} {...allProps} />
    </div>
  );
};

export default ActBtn;
