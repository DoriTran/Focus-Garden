import styles from "./Background.module.scss";

const Background = () => {
  return (
    <div className={styles.container}>
      <div className={styles.fence} style={{ backgroundImage: 'url("/sprites/garden/fence.png")' }} />
      <div className={styles.garden} style={{ backgroundImage: 'url("/sprites/garden/grass.png")' }} />
    </div>
  );
};

export default Background;
