import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})

export class RoomListComponent implements OnInit {
  roomList = [];
  liveUserCount = 0;
  breakpoint: number;
  constructor(private socket: SocketService) {}
  ngOnInit(): void {
    this.breakpoint = Math.floor(window.innerWidth / 300);

    this.socket.rooms.subscribe((data) => {
      this.roomList = data.map((room) => {
        let isDark = Math.random() > 0.5;
        room['bgColor'] = isDark
          ? this.getRandomDarkColor()
          : this.getRandomLightColor();
        room['color'] = isDark ? 'white' : 'black';
        return room;
      });
      console.log('updated',this.roomList);
      
    });

    this.socket.totalUsersCount.subscribe((data) => {
      this.liveUserCount = data;
    });
  }

  joinRoom(roomId: string) {
    this.socket.joinRoom(roomId);
  }

  // utilit
  getRandomDarkColor() {
    return 'hsl(' + Math.random() * 360 + ', 80%, 25%)';
  }
  getRandomLightColor() {
    return 'hsl(' + Math.random() * 360 + ', 80%, 75%)';
  }
  onResize(event) {
    this.breakpoint = Math.max(2, Math.floor(event.target.innerWidth / 300));
  }
}
