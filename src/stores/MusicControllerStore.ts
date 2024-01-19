import type { Song } from "@/models/SongsOutput";
import { reactive } from "vue";

import { musicStore } from "./MusicStore";

interface MusicControllerStoreInterface {
  audioPlayer?: HTMLAudioElement;
  currentSong: Song;
  currentTime: number;
  volume: number;
  isPlaying: boolean;
  isMuted: boolean;

  initAudioPlayer(audioPlayer: HTMLAudioElement): void;
  setCurrentSong(song: Song): void;
  setCurrentTime(time: number): void;
  setVolume(volume: number): void;
  togglePlaying(): void;
  toggleMuted(): void;

  playPreviousSong(): void;
  playNextSong(): void;

  seekTo(time: number): void;
}

export const musicControllerStore = reactive<MusicControllerStoreInterface>({
  currentSong: musicStore.songs[0],
  currentTime: 0,
  volume: 0.1,
  isPlaying: false,
  isMuted: false,

  initAudioPlayer(audioPlayer: HTMLAudioElement) {
    this.audioPlayer = audioPlayer;

    this.audioPlayer.volume = this.volume;

    this.audioPlayer.addEventListener("timeupdate", () => {
      this.currentTime = this.audioPlayer?.currentTime ?? 0;
    });

    this.audioPlayer.addEventListener("ended", () => {
      this.playNextSong();
    });
  },

  setCurrentSong(song: Song) {
    this.currentSong = song;

    if (!this.audioPlayer) return;
    this.audioPlayer.load();
    this.audioPlayer.play();
    this.isPlaying = true;
  },

  setCurrentTime(time: number) {
    this.currentTime = time;
  },

  setVolume(volume: number) {
    this.volume = volume;

    if (!this.audioPlayer) return;
    this.audioPlayer.volume = volume;

    if (this.isMuted) this.toggleMuted();
  },

  togglePlaying() {
    if (!this.audioPlayer) return;

    if (this.audioPlayer.paused) {
      this.audioPlayer.play();
      this.isPlaying = true;
    } else {
      this.audioPlayer.pause();
      this.isPlaying = false;
    }
  },

  toggleMuted() {
    if (!this.audioPlayer) return;

    if (this.audioPlayer.muted) {
      this.isMuted = false;
      this.audioPlayer.muted = this.isMuted;
    } else {
      this.isMuted = true;
      this.audioPlayer.muted = this.isMuted;
    }
  },

  playPreviousSong() {
    if (!this.audioPlayer) return;

    if (this.audioPlayer.currentTime > 3) {
      this.audioPlayer.currentTime = 0;
      return;
    }

    const previousSongIndex =
      musicStore.songs.findIndex((song) => song.id === this.currentSong.id) - 1;

    this.setCurrentSong(
      musicStore.songs[(previousSongIndex + musicStore.songs.length) % musicStore.songs.length]
    );

    this.audioPlayer.load();
    this.audioPlayer.play();
  },

  playNextSong() {
    if (!this.audioPlayer) return;

    const nextSongIndex = musicStore.songs.findIndex((song) => song.id === this.currentSong.id) + 1;

    this.setCurrentSong(musicStore.songs[nextSongIndex % musicStore.songs.length]);

    this.audioPlayer.load();
    this.audioPlayer.play();
  },

  seekTo(time: number) {
    if (!this.audioPlayer) return;

    this.audioPlayer.currentTime = time;
  },
});
