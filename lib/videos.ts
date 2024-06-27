export type VideoType = {
  title: string;
  imgUrl: string;
  id: string;
};

export const getVideos = async (searchQuery: string = "") => {
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${searchQuery}&key=${process.env.YOUTUBE_API_KEY}`
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
