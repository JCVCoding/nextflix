export type VideoType = {
  title: string;
  imgUrl: string;
  id: string;
};

export const getCommonVideos = async (url: string = "") => {
  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      console.error("Youtube API Error", data.error);
      return [];
    }

    return data.items.map((item: any) => {
      const id = item.id.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
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
