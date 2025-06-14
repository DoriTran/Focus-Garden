import Ground from "./Ground/Ground";
import GrowArea from "./GrowArea/GrowArea";
import Timer from "./Timer/Timer";
import styles from "./index.module.scss";

const GrowPage = () => {
  return (
    <div className={styles.container}>
      <GrowArea />
      <Ground />
      <Timer />
    </div>
  );
};

export default GrowPage;
