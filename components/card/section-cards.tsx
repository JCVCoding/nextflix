import React from "react";
import Card from "./card";
import styles from "./section-cards.module.css";

type SectionCardsType = {
  title: string;
};

const SectionCards = ({ title }: SectionCardsType) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card imgUrl="/static/clifford.webp" size="large" />
      </div>
    </section>
  );
};

export default SectionCards;