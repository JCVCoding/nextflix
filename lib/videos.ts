import videoTestData from "../data/videos.json";
// import { getMyListVideos, getWatchedVideos } from "./db/hasura";

export type VideoType = {
  title: string;
  imgUrl: string;
  id: string;
};

const fetchVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};

export const getCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((item: any) => {
      const id = item.id.videoId || item.id;
      const snippet = item.snippet;
      return {
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&type=video&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

// export const getWatchItAgainVideos = async (userId, token) => {
//   const videos = await getWatchedVideos(userId, token);
//   return (
//     videos?.map((video) => {
//       return {
//         id: video.videoId,
//         imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
//       };
//     }) || []
//   );
// };

// export const getMyList = async (userId, token) => {
//   const videos = await getMyListVideos(userId, token);
//   return (
//     videos?.map((video) => {
//       return {
//         id: video.videoId,
//         imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
//       };
//     }) || []
//   );
// };
