import styles from "./Background.module.scss";

const Background = () => {
  return <div style={{ backgroundImage: `url("/sprites/shop/background.png")` }} className={styles.bgImg} />;
};

export default Background;
