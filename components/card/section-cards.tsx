import React from "react";
import Card, { CardSizes } from "./card";
import styles from "./section-cards.module.css";
import { VideoType } from "@/lib/videos";

type SectionCardsType = {
  title: string;
  videos: Array<VideoType>;
  size: CardSizes;
};

const SectionCards = ({ title, videos = [], size }: SectionCardsType) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Card imgUrl={video.imgUrl} size={size} id={index} key={video.id} />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
