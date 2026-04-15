export type Album = {
  id: string;
  artist: string;
  title: string;
  year: number;
};

export type Song = {
  id: string;
  name: string;
  artist: string;
  duration: string;
};

export const albums: Album[] = [
  { id: '1', artist: 'Arctic Waves', title: 'Midnight Horizon', year: 2024 },
  { id: '2', artist: 'Luna Park', title: 'Echoes of Summer', year: 2023 },
  { id: '3', artist: 'Neon Atlas', title: 'Skyline Letters', year: 2025 },
  { id: '4', artist: 'Milo Finch', title: 'Golden Hours', year: 2022 },
  { id: '5', artist: 'Velvet Signal', title: 'City of Color', year: 2021 },
];

export const songs: Song[] = [
  { id: 's1', name: 'Waves and Fire', artist: 'Arctic Waves', duration: '3:45' },
  { id: 's2', name: 'Slow Orbit', artist: 'Luna Park', duration: '2:58' },
  { id: 's3', name: 'Blue Frequency', artist: 'Neon Atlas', duration: '4:11' },
  { id: 's4', name: 'Sunset Drive', artist: 'Milo Finch', duration: '3:22' },
  { id: 's5', name: 'Painted Streets', artist: 'Velvet Signal', duration: '3:07' },
  { id: 's6', name: 'Gravity Letters', artist: 'Arctic Waves', duration: '4:03' },
];
