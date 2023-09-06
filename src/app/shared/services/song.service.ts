import { HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTES } from 'src/app/constants/constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  songRawData: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject(
    null
  );
  songList: BehaviorSubject<any> = new BehaviorSubject(null);
  onSongUpdate: EventEmitter<string> = new EventEmitter();

  constructor(private api: ApiService) {}

  async searchSong(query: string) {
    let data = await this.api.get(`${ROUTES.SEARCH_SONGS}${query}`);
    this.songList.next(data);
  }

  async getRawSong(videoId: string) {
    if (this.songRawData.getValue()?.[videoId]) {
      console.log('already loaded');
      return;
    }

    this.api
      .getRawFile(`${ROUTES.GET_RAW_FILE}/${videoId}`)
      .subscribe((result) => {
        const newRawData = { ...this.songRawData.getValue() };
        const song = {
          progress: 0,
          isLoading: true,
          url: null,
        };
        if (result.type === HttpEventType.DownloadProgress) {
          song.progress = Math.round((100 * result.loaded) / result.total);
        } else if (result.type === HttpEventType.Response) {
          song.progress = 100;
          song.isLoading = false;
          song.url = URL.createObjectURL(result.body);
        }

        newRawData[videoId] = song;
        this.songRawData.next(newRawData);
        if(result.type === HttpEventType.Response) this.onSongUpdate.emit(videoId);
      });
  }
}
