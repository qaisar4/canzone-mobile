import { apiClient } from './apiClient';

export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export const userApi = {
  async login(payload: AuthPayload) {
    return apiClient.request({
      endpoint: '/auth/login',
      method: 'POST',
      body: payload,
      mockDelayMs: 400,
      mockHandler: () => ({
        token: 'mock-token',
        email: payload.email,
        name: 'Canzone User',
      }),
    });
  },
  async signup(payload: AuthPayload) {
    return apiClient.request({
      endpoint: '/auth/signup',
      method: 'POST',
      body: payload,
      mockDelayMs: 500,
      mockHandler: () => ({
        token: 'mock-signup-token',
        email: payload.email,
        name: payload.name ?? 'New Listener',
      }),
    });
  },
};
