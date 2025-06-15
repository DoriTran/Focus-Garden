import styles from "./Ground.module.scss";

const Ground = () => {
  return (
    <div className={styles.wrapper}>
      <div style={{ backgroundImage: 'url("/sprites/grow/grass.png")' }} className={styles.grass} />
      <div style={{ backgroundImage: 'url("/sprites/grow/dirt.png")' }} className={styles.dirt} />
    </div>
  );
};

export default Ground;
