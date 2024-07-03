import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getYoutubeVideoById } from "@/lib/videos";
import NavBar from "@/components/nav/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";
import { useState } from "react";

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
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {
    channelTitle,
    description,
    publishTime,
    title,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  const handleToggleDislike = () => {
    if (toggleDislike !== true) {
      setToggleDislike(true);
      setToggleLike(false);
    }
  };
  const handleToggleLike = () => {
    if (toggleLike !== true) {
      setToggleLike(true);
      setToggleDislike(false);
    }
  };
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
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>
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
