import { PLAYER_STATE } from "../constants/constants";

export interface Room {
  room: RoomDetail;
  users: User[];
  queue: Song[];
}

export interface Song {
  videoId: string;
  image: string;
  title: string;
  seconds: number;
  views: number;
  ago: string;
  index?: number;
}

export interface RoomDetail {
  roomId: string;
  name: string;
  userCount: number;
}
export interface Player {
  state: PLAYER_STATE;
  startedAt: number;
  song: Song;
}

export interface User {
  username: string;
  id: string;
}

export interface Message {
  content: string,
  timestamp: number,
  sender: User
}