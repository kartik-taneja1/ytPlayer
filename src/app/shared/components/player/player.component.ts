import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PLAYER_STATE } from 'src/app/constants/constants';
import { Song } from 'src/app/models/room.model';
import { SocketService } from '../../services/socket.service';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})

// export class PlayerComponent implements OnInit,AfterViewInit {
//   // @ViewChild('songEl') songEl: YouTubePlayer;
//   @ViewChild('progressEl') progressEl: ElementRef;

//   isPlaying = false;
//   song: any = null;
//   config = {
//     enablejsapi: 1,
//     cc_load_policy: 1,
//   };

//   progressBar = 0;
//   currentTimeStamp = 0;
//   timeInterval: any = null;
//   constructor(private shared: SharedService,private changeDetectorRef:ChangeDetectorRef) {}

//   isPlayerOpen = true;

//   togglePlayer(show: boolean) {
//     this.isPlayerOpen = show;
//   }

//   test(e: any) {
//     console.log(e);
//   }

//   ngOnInit(): void {
//     let isFirst = true;
//     this.shared.currentSong.subscribe((data) => {
//       if (!data) return;
//       this.song = data;
//       console.log(data);
//       // autoplay when song changes
//       if (!isFirst) {
//         console.log(this.songEl);
//         const onLoadSubscription = this.songEl.stateChange.subscribe(
//           (status) => {
//             console.log(status);
//             if (status.data == 5) {
//               onLoadSubscription.unsubscribe();
//               this.play();
//             }
//           }
//         );
//       } else {
//         isFirst = false;
//       }
//       this.songEl.setVolume(1);
//     });
//     // console.log('init player component')
//     // window.navigator.mediaSession.setActionHandler('seekforward',()=>{
//     //   this.seekFixed(true);
//     // })
//     // window.navigator.mediaSession.setActionHandler('seekbackward',()=>{
//     //   this.seekFixed();
//     // })
//     // window.navigator.mediaSession.setActionHandler('previoustrack',()=>{
//     //   this.seekFixed();
//     // })
//     // window.navigator.mediaSession.setActionHandler('nexttrack',()=>{
//     //   this.seekFixed(true);
//     // })
//     // window.navigator.mediaSession.setActionHandler('play',()=>{

//     //   console.log('play')
//     // })
//     // window.navigator.mediaSession.setActionHandler('pause',()=>{
//     //   this.play();
//     //   alert('event emmited')
//     //   console.log('pause')
//     // })
//     // window.navigator.mediaSession.setActionHandler('hangup',()=>{
//     //   console.log('hangup')
//     // })
//     let isStoppedByBlur=false;
//     window.onblur = ()=>{
//       setTimeout(() => {
//         this.songEl.playVideo();
//         console.log(this.isPlaying)
//       }, 10000);
//       console.log(this.isPlaying)
//     }
//   }

//   setSpeed(n) {
//     console.log('rate', n);
//     this.songEl.setPlaybackRate(n);
//   }
//   setVolume(n) {
//     console.log('volume', n);
//     this.songEl.setVolume(n);
//   }
//   play() {
//     if (this.timeInterval) {
//       clearInterval(this.timeInterval);
//       this.timeInterval = null;
//     }
//     // set progress update interval (min of 1s or 100th of total time)
//     this.timeInterval = setInterval(() => {
//       this.currentTimeStamp = this.songEl.getCurrentTime();
//       this.progressBar =
//         (100 * this.currentTimeStamp) / this.songEl.getDuration();
//     }, Math.round(Math.min(this.song.seconds / 100, 1) * 1000));
//     this.isPlaying = true;
//     this.songEl.playVideo();
//   }
//   pause() {
//     clearInterval(this.timeInterval);
//     this.timeInterval = null;
//     this.isPlaying = false;
//     this.songEl.pauseVideo();
//   }
//   seekTo(e: Event) {
//     let seekPerc = parseInt((e.target as HTMLInputElement).value);
//     let seekSec = (seekPerc / 100) * this.songEl.getDuration();
//     this.songEl.seekTo(seekSec, true);
//   }
//   seekFixed(forword: boolean=false) {
//     if (forword) {
//       this.songEl.seekTo(this.songEl.getCurrentTime() + 10, true);
//     } else {
//       this.songEl.seekTo(this.songEl.getCurrentTime() - 10, true);
//     }
//   }

//   // not related to player
//   checkIfLongTitle(parent: any, child: any) {
//     let parentWidth = parseInt(getComputedStyle(parent).width.slice(0, -2));
//     let childWidth = parseInt(getComputedStyle(child).width.slice(0, -2));
//     return childWidth > parentWidth;
//   }
//   ngAfterViewInit(): void {
//     this.changeDetectorRef.detectChanges()

//   }
// }


export class PlayerComponent implements OnInit, AfterViewInit {
  songData: Song;
  src = '';
  progressBar = 0;
  currentTimeStamp = 0;
  isPlayerOpen = false;

  song=  new Audio();  
  @ViewChild('progressEl') progressEl: ElementRef<any>;

  constructor(
    private socket: SocketService,
    private songService: SongService
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.song.ontimeupdate = this.timeUpdate;
    this.socket.player.subscribe((data) => {
      this.songData = data.song;
      switch (data.state) {
        case PLAYER_STATE.PLAYING:
          const songData = this.songService.songRawData.getValue();
          if (!songData || !songData[this.songData.videoId]?.url) {
            this.songService.getRawSong(this.songData.videoId);
            return;
          }
          this.src = songData[this.songData.videoId]?.url;
          this.song.src = this.src;
          this.song.currentTime = (Date.now() - data.startedAt) / 1000;
          this.play();
          break;
        case PLAYER_STATE.STOPPED:
          this.pause();
          break;
      }
    });
  }

  setSpeed(n) {
    this.song.playbackRate = n;
  }
  setVolume(n) {
    this.song.volume = n;
  }

  play() {
    this.song.play();
  }

  timeUpdate(){
    this.currentTimeStamp = this.song.currentTime;
    this.progressBar = (100 * this.currentTimeStamp) / this.song.duration;
  }

  pause() {
    this.song.pause();
  }

  seekTo(e: Event) {
    let seekPerc = parseInt((e.target as HTMLInputElement).value);
    let seekSec = (seekPerc / 100) * this.song.duration;
    this.song.currentTime = seekSec;
  }

  seekFixed(forword: boolean = false) {
    let time = this.song.currentTime;
    if (forword) {
      time += 10;
    } else {
      time -= 10;
    }
    this.song.currentTime = time;
  }

  // // not related to player
  checkIfLongTitle(parent: any, child: any) {
    let parentWidth = parseInt(getComputedStyle(parent).width.slice(0, -2));
    let childWidth = parseInt(getComputedStyle(child).width.slice(0, -2));
    return childWidth > parentWidth;
  }
}
