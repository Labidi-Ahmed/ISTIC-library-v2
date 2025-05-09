import axios from 'axios';
import API_URL from './config';
import {Article} from '@/types';

export const fetchArticle = async (articleUrl: string): Promise<Article> => {
  const {data} = await axios.post(
    `${API_URL}/article/scrape-article`,
    {
      url: articleUrl,
    },
    {withCredentials: true}
  );
  return data;
};
