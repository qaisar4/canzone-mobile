import { apiClient } from './apiClient';

export type AuthPayload = {
  email: string;
  password: string;
  username?: string;
  role?: 'user' | 'artist';
};

export const userApi = {
  async login(payload: AuthPayload) {
    return apiClient.request({
      endpoint: '/api/v1/auth/login',
      method: 'POST',
      body: payload,
    });
  },
  async signup(payload: AuthPayload) {
    console.log('signup payload', payload);
    console.log('signup url', '/api/v1/auth/signup');
    return apiClient.request({
      endpoint: '/api/v1/auth/signup',
      method: 'POST',
      body: payload,
    });
  },
  async deleteAccount() {
    return apiClient.request({
      endpoint: '/api/v1/auth/account',
      method: 'DELETE',
    });
  },
};
