import { Injectable } from '@angular/core';
import { ROUTES } from 'src/app/constants/constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

  constructor(private api: ApiService) {
    console.log('init room api');
    
   }

  getVideoDetails(videoId: string){
    return this.api.get(`${ROUTES.SONG_DETAILS}/${videoId}`);
  }

}
