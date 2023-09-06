import { Component, OnInit } from '@angular/core';
import { RoomDetail, User } from 'src/app/models/room.model';
import { SocketService } from 'src/app/shared/services/socket.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  roomDetail!: RoomDetail;
  users: User[] = [];
  breakpoint: number;

  constructor(private socket: SocketService, private utils: UtilityService) {}

  ngOnInit(): void {
    this.breakpoint = Math.floor(window.innerWidth / 300);

    this.socket.room.subscribe((room) => {
      this.roomDetail = room;
    });
    this.socket.users.subscribe((users) => {
      this.users = users;
    });
  }
  
  onResize(event) {
    this.breakpoint = Math.max(2, Math.floor(event.target.innerWidth / 300));
  }
}
