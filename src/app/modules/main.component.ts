import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DilogComponent } from '../shared/components/dilog/dilog.component';
import { LoaderService } from '../shared/services/loader.service';
import { LocalService } from '../shared/services/local.service';
import { SocketService } from '../shared/services/socket.service';
import { SongService } from '../shared/services/song.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isSidebarOpen = new BehaviorSubject(this.isDefaultOpen());
  username = '';
  joinedRoom = '';

  constructor(
    private socketService: SocketService,
    private dilog: MatDialog,
    private localStorage: LocalService,
    private loader: LoaderService,
    private songService: SongService
  ) {}

  song:any;

  ngOnInit(): void {
    console.log('init main');
    this.loader.stop();
    this.username = this.localStorage.getData('username');
    this.joinedRoom = this.localStorage.getData('roomId');
    if (this.username) {
      this.socketService.init(this.username, this.joinedRoom);
    } else {
      this.getUserName();
    }

    this.songService.songRawData.subscribe(data=>{
      if(!data) return;    
    })
  }

  toggleSidebar(event: boolean) {
    this.isSidebarOpen.next(event);
  }
  isDefaultOpen() {
    return window.innerWidth > 600;
  }

  getUserName() {
    this.dilog
      .open(DilogComponent, {
        data: {
          label: 'Username',
          title: 'Hey',
          subTitle: "What's you name?",
          value: '',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.username = result;
        if (this.username) {
          this.localStorage.saveData('username', this.username);
          this.socketService.init(this.username, this.joinedRoom);
        } else {
          this.getUserName();
        }
      });
  }
}
