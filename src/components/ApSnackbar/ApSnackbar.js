import { SnackbarContent } from "@mui/material";
import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import styles from "./ApSnackbar.module.scss";

const ApSnackbar = forwardRef(({ message, variant }, ref) => {
  const iconImgPath = useMemo(() => {
    if (variant !== "coin" && variant !== "gem") return null;
    return `/sprites/currency/${variant}.png`;
  }, [variant]);

  return (
    <SnackbarContent
      ref={ref}
      className={clsx(styles.snackbar, styles[`${variant}-snackbar`])}
      message={
        <div className={styles.message}>
          {iconImgPath && (
            <div className={styles.wrapper}>
              <div style={{ backgroundImage: `url("${iconImgPath}")` }} className={styles.icon} />
            </div>
          )}
          <div className={styles.text}>{message}</div>
        </div>
      }
    />
  );
});

ApSnackbar.displayName = "ApSnackbar";
export default ApSnackbar;
