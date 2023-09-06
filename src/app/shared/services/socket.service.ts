import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { PLAYER_STATE } from 'src/app/constants/constants';
import { SocketEvents } from 'src/app/constants/socketEvents';
import {
  Message,
  Player,
  Room,
  RoomDetail,
  Song,
  User,
} from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  private roomBS: BehaviorSubject<RoomDetail> = new BehaviorSubject({
    roomId: '',
    name: '',
    userCount: 0
  });
  private queueBS: BehaviorSubject<Song[]> = new BehaviorSubject([]);
  private usersBS: BehaviorSubject<User[]> = new BehaviorSubject([]);
  private messagesBS: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  private roomsBS: BehaviorSubject<RoomDetail[]> = new BehaviorSubject([]);
  private totalUsersCountBS: BehaviorSubject<number> = new BehaviorSubject(0);
  private userStateBS: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private playerBS: BehaviorSubject<Player> = new BehaviorSubject(this.defaultPlayer);

  public room = this.roomBS.asObservable();
  public queue = this.queueBS.asObservable();
  public users = this.usersBS.asObservable();
  public messages = this.messagesBS.asObservable();

  public rooms = this.roomsBS.asObservable();
  public totalUsersCount = this.totalUsersCountBS.asObservable();
  public userState = this.userStateBS.asObservable();
  public player = this.playerBS.asObservable();

  constructor(
    private localStorage: LocalService,
    private router: Router,
    private snackBar: MatSnackBar,
    private songService: SongService
  ) {}

  init(username: string, currentRoom?: string) {
    if(this.socket) this.socket.disconnect();
    // this.socket = io(environment.SOCKET _URL, {  transports: ['websocket'] , autoConnect: false , query: {username}});
    this.listenEvents();
    this.socket.on(SocketEvents.ON_CONNECT, () => {
      console.log('got old rom', currentRoom);
      if (currentRoom) this.joinRoom(currentRoom);
    });
    this.songService.onSongUpdate.subscribe(this.onSongLoad);
    this.socket.connect();
  }

  listenEvents() {
    this.socket.on(SocketEvents.ON_INIT, this.onSocketInit);
    this.socket.on(SocketEvents.ON_NEW_USER_CONNECT, this.onNewUserConnect);
    this.socket.on(SocketEvents.ON_USER_DISCONNECT, this.onUserDisconnect);
    this.socket.on(SocketEvents.ON_MESSAGE, this.onMessage);
    this.socket.on(SocketEvents.ON_CHANGE_USERNAME, this.onChangeUserName);
    this.socket.on(SocketEvents.ON_USER_STATE_CHANGE, this.onUserStatusChange);
    this.socket.on(SocketEvents.ON_CREATE_ROOM, this.onCreateRoom);
    this.socket.on(SocketEvents.ON_DELETE_ROOM, this.onDeleteRoom);
    this.socket.on(SocketEvents.ON_JOIN_ROOM, this.onJoinRoom);
    this.socket.on(SocketEvents.ON_LEAVE_ROOM, this.onLeaveRoom);
    this.socket.on(SocketEvents.ON_ADD_TO_QUEUE, this.onAddToQueue);
    this.socket.on(SocketEvents.ON_REMOVE_FROM_QUEUE, this.onRemoveFromQueue);
    this.socket.on(
      SocketEvents.ON_PLAYER_STATE_CHANGE,
      this.onPlayerStateChange
    );
  }

  createRoom(roomName: string) {
    this.socket.emit(
      SocketEvents.ON_CREATE_ROOM,
      {
        name: roomName,
      },
      this.joinRoomCallback
    );
  }

  deleteRoom() {
    this.socket.emit(SocketEvents.ON_DELETE_ROOM);
  }

  joinRoom(roomId: string) {
    console.log('joining', roomId);

    this.socket.emit(
      SocketEvents.ON_JOIN_ROOM,
      {
        roomId,
      },
      this.joinRoomCallback
    );
  }

  leaveRoom() {
    this.socket.emit(SocketEvents.ON_LEAVE_ROOM);
    this.roomBS.next({
      roomId: '',
      name: '',
      userCount: 0,
    });
    this.queueBS.next([]);
    this.usersBS.next([]);
    this.clearMessages();
    this.localStorage.removeData('roomId');
    this.router.navigate(['']);
  }

  addSong(data: Song) {
    if (!this.roomBS.getValue().roomId) {
      this.snackBar.open('Join Room to add this song to queue');
      return;
    }

    this.socket.emit(SocketEvents.ON_ADD_TO_QUEUE, {
      videoId: data.videoId,
    });
  }

  removeSongFromQueue(data: Song) {
    this.socket.emit(SocketEvents.ON_REMOVE_FROM_QUEUE, data);
  }

  sendMessage(message: string) {
    this.socket.emit(SocketEvents.ON_MESSAGE, message);
  }

  userStateChange(isReady: boolean) {
    if (this.userStateBS.getValue() === isReady) return;
    this.userStateBS.next(isReady);
    this.socket.emit(SocketEvents.ON_USER_STATE_CHANGE, { isReady });
  }

  // event listener functions

  private onSocketInit = (data: { rooms: RoomDetail[]; userCount: any }) => {
    this.roomsBS.next(data.rooms);
    this.totalUsersCountBS.next(data.userCount);
  };
  private onNewUserConnect = () => {
    this.totalUsersCountBS.next(this.totalUsersCountBS.getValue() + 1);
  };
  private onUserDisconnect = () => {
    this.totalUsersCountBS.next(this.totalUsersCountBS.getValue() - 1);
  };

  private onCreateRoom = (room: RoomDetail) => {
    this.roomsBS.next([...this.roomsBS.getValue(), room]);
  };
  private onDeleteRoom = (roomDelete: RoomDetail) => {
    this.roomsBS.next(
      this.roomsBS
        .getValue()
        .filter((room) => room.roomId === roomDelete.roomId)
    );
  };

  private onJoinRoom = (userJoin: User) => {
    this.roomBS.next({
      ...this.roomBS.getValue(),
      userCount: this.roomBS.getValue().userCount + 1,
    });
    this.usersBS.next([...this.usersBS.getValue(), userJoin]);
    this.clearMessages();
  };
  private onLeaveRoom = (userLeave: User) => {
    this.roomBS.next({
      ...this.roomBS.getValue(),
      userCount: this.roomBS.getValue().userCount - 1,
    });
    this.usersBS.next(
      this.usersBS.getValue().filter((user) => user.id !== userLeave.id)
    );
  };

  private onAddToQueue = (song: Song) => {
    if (!song?.videoId) return;
    this.queueBS.next([...this.queueBS.getValue(), song]);
    this.songService.getRawSong(song.videoId);
  };
  private onRemoveFromQueue = (data: Song) => {
    let newQueue = this.queueBS
      .getValue()
      .filter((song) => song.index !== data.index);
    newQueue = this.updateIndex(newQueue);
    this.queueBS.next(newQueue);
  };

  private onMessage = (message: Message) => {
    this.messagesBS.next([...this.messagesBS.getValue(), message]);
  };

  private onChangeUserName = (userUpdate: User) => {
    this.updateUser(userUpdate);
    this.messagesBS.next(
      this.messagesBS.getValue().map((msg) => {
        if (msg.sender.id === userUpdate.id) {
          msg.sender = userUpdate;
        }
        return msg;
      })
    );
  };
  private onUserStatusChange = (userUpdate: User) => {
    this.updateUser(userUpdate);
  };
  private onPlayerStateChange = (data: Player) => {
    this.playerBS.next(data);
    if (data.state === PLAYER_STATE.PLAYING) {
      this.checkNextReady();
    }
  };

  // utils function

  get defaultPlayer() {
    return {
      song: null,
      startedAt: 0,
      state: PLAYER_STATE.STOPPED,
    };
  }
  private joinRoomCallback = (data: Room,player: Player) => {
    console.log('recieved  callback', this.roomBS);
    this.roomBS.next(data.room);
    this.playerBS.next(player)
    this.queueBS.next(data.queue);
    this.usersBS.next(data.users);
    this.localStorage.saveData('roomId', data.room.roomId);
    this.router.navigate(['live']);
  };

  private clearMessages = () => {
    this.messagesBS.next([]);
  };

  private updateIndex = (queue: Song[]) => {
    queue.sort((a, b) => a.index - b.index);
    return queue.map((song, i) => {
      song.index = i + 1;
      return song;
    });
  };
  private updateUser = (userUpdate: User) => {
    this.usersBS.next(
      this.usersBS
        .getValue()
        .map((user) => (user.id === userUpdate.id ? userUpdate : user))
    );
  };

  private checkNextReady = () => {
    const next = this.queueBS.getValue()[0];
    if (!next) {
      return this.userStateChange(false);
    }
    this.songService.songRawData.pipe(take(1)).subscribe((data) => {
      if (data[next.videoId]?.url) {
        this.userStateChange(true);
      } else {
        this.songService.getRawSong(next.videoId);
        this.userStateChange(false);
      }
    });
  };
  private onSongLoad = (videoId: string) => {
    console.log('got',videoId,this.playerBS.getValue());
    
    if(this.playerBS.getValue()?.song?.videoId === videoId) {
      this.playerBS.next(this.playerBS.getValue());
      return;
    }
    const next = this.queueBS.getValue()[0];
    console.log('nx',next);
    
    if(next.videoId === videoId) {
      this.userStateChange(true);
    }
  }
}
