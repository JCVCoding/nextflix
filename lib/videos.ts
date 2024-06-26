import videoData from "../data/videos.json";

export type VideoType = {
  title: string;
  imgUrl: string;
  id: string;
};

export const getVideos = () => {
  return videoData.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item.id.videoId,
    };
  });
};
