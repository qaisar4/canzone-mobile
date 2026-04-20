import { tokenStore } from '../utils/tokenStore';
import { userStore } from '../utils/userStore';
import { apiClient } from './apiClient';

export type AuthPayload = {
  email: string;
  password: string;
  username?: string;
  role?: 'user' | 'artist';
};

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'artist';
  createdAt?: string;
};

type AuthResponse = {
  success: boolean;
  data: {
    user: UserProfile;
    accessToken: string;
    message: string;
  };
};

export const userApi = {
  async login(payload: AuthPayload) {
    const res = await apiClient.request<AuthResponse>({
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      body: payload,
    });

    console.log("Access token is here", res.data?.accessToken);
    if (res.data?.accessToken) tokenStore.set(res.data.accessToken);
    if (res.data?.user) userStore.set(res.data.user);
    return res;
  },
  async signup(payload: AuthPayload) {
    const res = await apiClient.request<AuthResponse>({
      endpoint: '/api/v1/auth/signup',
      method: 'POST',
      body: payload,
    });
    if (res.data?.accessToken) tokenStore.set(res.data.accessToken);
    if (res.data?.user) userStore.set(res.data.user);
    return res;
  },
  async deleteAccount() {
    const res = await apiClient.request({
      endpoint: '/api/v1/auth/account',
      method: 'DELETE',
    });
    userStore.clear();
    return res;
  },
  async getProfile() {
    const res = await apiClient.request<{ data: { user: UserProfile } }>({
      endpoint: '/api/v1/users/profile',
      method: 'GET',
    });
    return res.data.user;
  },
};
