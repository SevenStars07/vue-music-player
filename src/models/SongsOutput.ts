export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
};

export type SongsOutput = {
  songs: Song[];
};
