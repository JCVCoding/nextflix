import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner";
import NavBar from "@/components/nav/navbar";
import SectionCards from "@/components/card/section-cards";
import { getVideos, VideoType } from "@/lib/videos";

export async function getServerSideProps() {
  const disneyVideos = getVideos();
  return { props: { disneyVideos } };
}

export default function Home({ disneyVideos }: { disneyVideos: VideoType[] }) {
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
