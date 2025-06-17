/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from "react";
import { ApIcon } from "components";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { probability } from "utils";
import { useStoreGrow } from "store";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import styles from "./Timer.module.scss";

const Timer = () => {
  const { growNewPlant, growUp, time, tickTime } = useStoreGrow(
    useShallow((state) => ({
      growNewPlant: state.growNewPlant,
      growUp: state.growUp,
      time: state.time,
      tickTime: state.tickTime,
    }))
  );

  // Tick logic & state
  const [isPause, setIsPause] = useState(false);
  const shouldTickTime = useMemo(() => {
    return time !== null && !isPause;
  }, [time, isPause]);

  useEffect(() => {
    if (!shouldTickTime) return;
    const interval = setInterval(() => {
      tickTime(time + 1);
      // if (probability(10)) growUp();
    }, 1000);

    return () => clearInterval(interval);
  }, [shouldTickTime]);

  // Time formatting
  const { formatedTime, styleGap } = useMemo(() => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    const paddedMins = mins.toString().padStart(hrs > 0 ? 2 : 1, "0");
    const paddedSecs = secs.toString().padStart(2, "0");

    const final = hrs > 0 ? `${hrs}:${paddedMins}:${paddedSecs}` : `${paddedMins}:${paddedSecs}`;
    const hrsLength = hrs === 0 ? 0 : Math.floor(Math.log10(hrs)) + 1;
    return {
      formatedTime: final,
      styleGap: hrsLength === 0 ? 50 : Math.max(5, 35 - (hrsLength - 1) * 10),
    };
  }, [time]);

  return (
    <div
      className={styles.container}
      style={{ bottom: time !== null ? "var(--timer-position)" : "var(--starter-position)" }}
    >
      {time === null && (
        <div className={clsx(styles.transition, styles.starter)}>
          <ApIcon icon="handHoldingSeedling" customSVG onClick={() => growNewPlant()} color="var(--grow)" size={75} />
        </div>
      )}
      {time !== null && (
        <div className={clsx(styles.transition, styles.timer)} style={{ gap: styleGap }}>
          <ApIcon
            icon={isPause ? faPlay : faPause}
            onClick={() => setIsPause(!isPause)}
            color="var(--text)"
            size={isPause ? 30 : 34}
            style={{ width: 40 }}
          />
          <div className={styles.text}>{formatedTime}</div>
        </div>
      )}
    </div>
  );
};

export default Timer;
