import {create} from 'zustand';

export interface Chat {
  id: string;
  title: string;
}

interface ChatsStore {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
}

export const useChatsStore = create<ChatsStore>()((set) => ({
  chats: [],
  setChats: (newChats: Chat[]) => set({chats: newChats}),
}));
