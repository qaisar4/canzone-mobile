import { albums } from '../utils/mockData';
import { apiClient } from './apiClient';

export const albumsApi = {
  async listAlbums() {
    return apiClient.request({
      endpoint: '/albums',
      mockDelayMs: 350,
      mockHandler: () => albums,
    });
  },
};
