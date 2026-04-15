import { songs } from '../utils/mockData';
import { apiClient } from './apiClient';

export const songsApi = {
  async getRandomSongs(limit = 4) {
    return apiClient.request({
      endpoint: '/songs/random',
      query: { limit },
      mockDelayMs: 250,
      mockHandler: () => {
        const shuffled = [...songs].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, limit);
      },
    });
  },
};
