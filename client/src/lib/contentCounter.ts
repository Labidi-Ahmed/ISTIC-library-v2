import {GenerationData} from '@/types';

export const getTotalContentLength = (generationData: GenerationData) => {
  const {articles, styleVideos} = generationData;
  let totalLength = 0;

  // Count characters in articles
  if (articles?.length) {
    articles.forEach((article) => {
      totalLength += article.content.length;
    });
  }

  // Count characters in style videos
  if (styleVideos?.length) {
    styleVideos.forEach((video) => {
      totalLength += video.transcript.length;
    });
  }

  return totalLength;
};
