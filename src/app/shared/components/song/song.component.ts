import { Component, Input, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { saveAs } from 'file-saver';
import { UtilityService } from '../../services/utility.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../../services/socket.service';
import { Song } from 'src/app/models/room.model';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  @Input('song') song: Song;
  isLoadingStarted = false;
  isLoading = false;
  loadedPerc = 0;

  constructor(private songService: SongService, private socket: SocketService, private snackBar: MatSnackBar){
   
  }
  ngOnInit(): void {
    this.songService.songRawData.subscribe(data=>{
      let currentSong = data?.[this.song.videoId];
      if(currentSong) {
        this.isLoadingStarted = true;
        this.isLoading = currentSong.isLoading;
        this.loadedPerc = currentSong.progress || 0;
      } else {
        this.isLoadingStarted = false;
        this.isLoading = false;
        this.loadedPerc = 100;
      }
    });
  }


  async addToQueue(){
    this.snackBar.open("Adding to Queue");
    console.log(this.song);
    
    this.socket.addSong(this.song);
  }
}
