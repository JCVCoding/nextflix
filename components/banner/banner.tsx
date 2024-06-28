import React from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

type BannerProps = {
  title: string;
  subTitle: string;
  imgUrl: string;
  videoID: string;
};

const Banner = ({ title, subTitle, imgUrl, videoID }: BannerProps) => {
  const router = useRouter();
  const handleOnPlay = () => {
    router.push(`video/${videoID}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="play icon"
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
