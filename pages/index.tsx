import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import Card, { CardType } from "@/components/card/card";
import SectionCards from "@/components/card/section-cards";

export default function Home() {
  const disneyVideos: Array<CardType> = [
    { imgUrl: "/static/clifford.webp" },
    { imgUrl: "/static/clifford.webp" },
    { imgUrl: "/static/clifford.webp" },
    { imgUrl: "/static/clifford.webp" },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="jvcoding9407@gmail.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
        <SectionCards title="Disney" videos={disneyVideos} size="small" />
      </div>
    </div>
  );
}
