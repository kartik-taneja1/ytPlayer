import { Component } from '@angular/core';
import { Song } from 'src/app/models/room.model';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent {
  queue: Song[];

  constructor(private socket: SocketService) {
    this.socket.queue.subscribe(data=>{
      this.queue = data;
    })
  }
}
