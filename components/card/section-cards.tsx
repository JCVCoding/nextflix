import React from "react";
import Card, { CardSizes } from "./card";
import styles from "./section-cards.module.css";
import { VideoType } from "@/lib/videos";
import Link from "next/link";

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
          <Link href={`/video/${video.id}`} key={video.id}>
            <Card imgUrl={video.imgUrl} size={size} id={index} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
