import {create} from 'zustand';

export interface User {
  id: string;
  avatarUrl: string;
  username: string;
  email: string;
  creditBalance: number;
  subscriptionPlan: string;
}

interface UserStore {
  user: User;
  setUser: (newUser: User) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: {
    id: '',
    avatarUrl: '',
    username: '',
    email: '',
    creditBalance: 0,
    subscriptionPlan: '',
  },
  setUser: (newUser: User) => set({user: newUser}),
}));
