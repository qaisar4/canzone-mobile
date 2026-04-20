import { UserProfile } from '../api/userApi';

let currentUser: UserProfile | null = null;

export const userStore = {
  get: (): UserProfile | null => currentUser,
  set: (user: UserProfile) => {
    currentUser = user;
  },
  clear: () => {
    currentUser = null;
  },
};
