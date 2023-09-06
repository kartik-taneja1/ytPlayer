import { Component } from '@angular/core';
import { Message } from 'src/app/models/room.model';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages: Message[] = [];
  msgText = '';

  constructor(private socket: SocketService) {
    this.socket.messages.subscribe((data) => {
      this.messages = data;
    });
  }

  sendMessage() {
    console.log(this.msgText);
    
    this.socket.sendMessage(this.msgText);
    this.msgText = '';
  }
}
