import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../ext-module/material/material.module';
import { DilogComponent } from '../shared/components/dilog/dilog.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { PlayerComponent } from '../shared/components/player/player.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { SongComponent } from '../shared/components/song/song.component';
import { NumToKMBPipe } from '../shared/pipes/num-to-kmb.pipe';
import { SanitizePipe } from '../shared/pipes/sanitize.pipe';
import { SecToHMSPipe } from '../shared/pipes/sec-to-hms.pipe';
import { LocalService } from '../shared/services/local.service';
import { RoomGuard } from '../shared/services/room.guard';
import { SocketService } from '../shared/services/socket.service';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './live-feed/chat/chat.component';
import { LiveFeedComponent } from './live-feed/live-feed.component';
import { QueueComponent } from './live-feed/queue/queue.component';
import { RoomDetailsComponent } from './live-feed/room-details/room-details.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { RoomListComponent } from './room-list/room-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    DilogComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    SongComponent,
    SecToHMSPipe,
    NumToKMBPipe,
    SanitizePipe,
    RoomListComponent,
    LiveFeedComponent,
    RoomDetailsComponent,
    ChatComponent,
    PlayerComponent,
    QueueComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    NgbModule,
    MaterialModule
  ],
  providers: [RoomGuard, LocalService, SocketService],
})
export class MainModule {}
