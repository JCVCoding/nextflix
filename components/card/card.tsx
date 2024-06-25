import Image from "next/image";
import styles from "./card.module.css";

type CardType = {
  imgUrl: string;
  size: string;
};

const Card = ({ imgUrl, size }: CardType) => {
  const classMap: { [key: string]: string } = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgUrl}
          alt="image"
          layout="fill"
          className={styles.cardImg}
        />
      </div>
    </div>
  );
};

export default Card;
