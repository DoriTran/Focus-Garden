import styles from "./Ground.module.scss";

const Ground = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div style={{ backgroundImage: 'url("/grow/grass.png")' }} className={styles.grass} />
      <div style={{ backgroundImage: 'url("/grow/dirt.png")' }} className={styles.dirt}>
        {children}
      </div>
    </div>
  );
};

export default Ground;
