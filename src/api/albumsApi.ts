import { albums } from '../utils/mockData';

export const albumsApi = {
  async listAlbums() {
    return albums;
  },
};
