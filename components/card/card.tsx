import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

type CardType = {
  imgUrl: string;
  size: "small" | "medium" | "large";
};

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  size = "medium",
}: CardType) => {
  const classMap: { [key: string]: string } = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const handleError = (event: any) => {
    console.log(event);
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2959&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ scale: 1.2 }}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
          onError={handleError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
