import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames";
import { getYoutubeVideoById } from "@/lib/videos";
import NavBar from "@/components/nav/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";
import { useEffect, useState } from "react";

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
  const videoID = context?.params?.videoID;
  const videoArray: Video[] = await getYoutubeVideoById(videoID);

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

  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        const favorited = data[0].favorited;
        if (favorited === 1) {
          setToggleLike(true);
        } else if (favorited === 0) {
          setToggleDislike(true);
        }
      }
    };
    handleLikeDislikeService();
  }, [videoId]);

  const runRatingService = async (favorited: number) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({ videoId, favorited }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const handleToggleDislike = async () => {
    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);
    const val = !toggleDislike;
    const favorited = val ? 0 : 1;
    const response = await runRatingService(favorited);
  };

  const handleToggleLike = async () => {
    const val = !toggleLike;
    setToggleLike(val);
    setToggleDislike(toggleLike);
    const favorited = val ? 1 : 0;
    const response = await runRatingService(favorited);
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
