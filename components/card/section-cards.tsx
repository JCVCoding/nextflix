import React from "react";
import Card, { CardSizes } from "./card";
import styles from "./section-cards.module.css";
import { VideoType } from "@/lib/videos";
import Link from "next/link";
import cls from "classnames";

type SectionCardsType = {
  title: string;
  videos: Array<VideoType>;
  size: CardSizes;
  shouldWrap?: boolean;
  shouldScale?: boolean;
};

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
}: SectionCardsType) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, index) => (
          <Link href={`/video/${video.id}`} key={video.id}>
            <Card
              imgUrl={video.imgUrl}
              size={size}
              id={index}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
