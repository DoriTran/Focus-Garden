import { useEffect, useMemo, useState } from "react";
import { ApIcon } from "components";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "./Timer.module.scss";

const Timer = () => {
  const [seconds, setSeconds] = useState(5000);
  const [isPause, setIsPause] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const formatedTime = useMemo(() => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const paddedMins = mins.toString().padStart(hrs > 0 ? 2 : 1, "0");
    const paddedSecs = secs.toString().padStart(2, "0");

    return hrs > 0 ? `${hrs}:${paddedMins}:${paddedSecs}` : `${paddedMins}:${paddedSecs}`;
  }, [seconds]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ApIcon
          icon={isPause ? faPlay : faPause}
          onClick={() => setIsPause(!isPause)}
          color="var(--text)"
          size={isPause ? 30 : 34}
          style={{ width: 40 }}
        />
        <div className={styles.text}>{formatedTime}</div>
      </div>
    </div>
  );
};

export default Timer;
