import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getYoutubeVideoById } from "@/lib/videos";
import NavBar from "@/components/nav/navbar";

Modal.setAppElement("#__next");

type Video = {
  title: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  viewCount: number;
};
type Repo = {
  name: string;
  stargazers_count: number;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const videoID = params!.videoId;
  const videoArray: Video[] = await getYoutubeVideoById(videoID);
  console.log(videoArray);

  return {
    props: { video: videoArray.length > 0 ? videoArray[0] : {} },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoID) => ({
    params: { videoID },
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const videoId = router.query.videoID;

  const {
    channelTitle,
    description,
    publishTime,
    title,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen
        contentLabel="Watch the video"
        className={styles.modal}
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          typeof="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
