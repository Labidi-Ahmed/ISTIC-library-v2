import axios from 'axios';
import API_URL from './config';
import {Chat} from '@/types';

export const fetchChat = async (id: string): Promise<Chat> => {
  const res = await axios.get(`${API_URL}/chats/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

/* export const updateChat = async ({
  id,
  script,
}: {
  id: string;
  script: Script;
}) => {
  const res = await axios.patch(
    `${API_URL}/chats/${id}`,
    {
      userRes: script,
    },
    {withCredentials: true}
  );
  return res.data;
}; */

export const deleteChat = async (chatId: string) => {
  await axios.delete(`${API_URL}/chats/${chatId}`, {
    withCredentials: true,
  });
};
