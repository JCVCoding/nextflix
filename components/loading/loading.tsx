import styles from "./loading.module.css";

const Loading = ({ isSmall }: { isSmall: boolean }) => {
  return <div className={`${styles.loader} ${styles.small}`}>Loading...</div>;
};

export default Loading;
