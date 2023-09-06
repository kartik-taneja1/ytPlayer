import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { LocalService } from '../../services/local.service';
import { SocketService } from '../../services/socket.service';
import { DilogComponent } from '../dilog/dilog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private socket: SocketService,
    private dilog: MatDialog,
    private localStorage: LocalService
  ) {}
  isInRoom = false;
  @Input('isSidebarOpen') isSidebarOpen: BehaviorSubject<boolean>;

  ngOnInit(): void {
    this.socket.room.subscribe(data=>{
      this.isInRoom = !!data.roomId;
    })
  }

  onMenuClick() {
    this.isSidebarOpen.next(!this.isSidebarOpen.getValue());
  }
  joinRoom() {
    this.dilog
      .open(DilogComponent, {
        data: {
          label: 'Room Id',
          subTitle: 'Can you tell me the roomId you want to join?',
        },
      })
      .afterClosed()
      .subscribe((roomId) => {
        if (roomId) {
          this.localStorage.saveData('roomId', roomId);
          this.socket.joinRoom(roomId);
        }
      });
  }

  createRoom() {
    this.dilog
      .open(DilogComponent, {
        data: {
          label: 'Room Name',
          subTitle: 'What should be room name?',
        },
      })
      .afterClosed()
      .subscribe((roomName) => {
        if (roomName) {
          this.socket.createRoom(roomName);
        }
      });
  }

  leaveRoom(){
    this.socket.leaveRoom();
  }
}
