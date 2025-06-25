/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useMemo, useState } from "react";
import { ApIcon } from "components";
import { faLeaf, faPause, faPlay, faSeedling } from "@fortawesome/free-solid-svg-icons";
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

  // State & Conditional Logic
  const [isPause, setIsPause] = useState(false);
  const isGrowOn = useMemo(() => time !== null, [time]);
  const isTimerOn = useMemo(() => time !== null && !isPause, [time, isPause]);

  // Timer Control & Gacha Tree Grow
  useEffect(() => {
    if (!isTimerOn) return;
    const interval = setInterval(() => {
      tickTime(time + 1);
      // growUp();
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerOn]);

  // Animations & Actions & Formatting
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

  const iconProps = useMemo(() => {
    if (isGrowOn)
      return {
        icon: isPause ? faPlay : faPause,
        size: isPause ? 30 : 34,
        color: "var(--text)",
        style: { width: 40 },
        onClick: () => setIsPause(!isPause),
      };
    return {
      icon: faLeaf,
      size: 30,
      color: "var(--grow)",
    };
  }, [isGrowOn, isPause]);

  return (
    <div
      className={styles.container}
      style={{ bottom: time !== null ? "var(--timer-position)" : "var(--starter-position)" }}
    >
      <div
        className={isGrowOn ? styles.timer : styles.starter}
        {...(!isGrowOn && { onClick: () => growNewPlant() })}
        {...(isGrowOn && { style: { gap: styleGap } })}
      >
        <ApIcon {...iconProps} />
        <div className={styles.text}>{isGrowOn ? formatedTime : "Grow!"}</div>
      </div>
    </div>
  );
};

export default Timer;
