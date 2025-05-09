import axios from 'axios';
import API_URL from './config';
import {Chat} from '@/types';
interface PendingScriptResponse {
  message: string;
  chat?: Chat; // Add this if you're returning the chat
}
export const acceptPending = async (
  chatId: string
): Promise<PendingScriptResponse> => {
  const response = await axios.patch(
    `${API_URL}/chats/${chatId}/accept-pending`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const rejectPending = async (
  chatId: string
): Promise<PendingScriptResponse> => {
  const response = await axios.patch(
    `${API_URL}/chats/${chatId}/reject-pending`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
